import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
const validation = workflow.split('      - name: Validar configuracao de autenticacao\n')[1]
  .split('      # Autenticação')[0];
const script = validation.split('        run: |\n')[1].replace(/^          /gm, '');
const bashExecutable =
  process.platform === 'win32' && existsSync('C:\\Program Files\\Git\\bin\\bash.exe')
    ? 'C:\\Program Files\\Git\\bin\\bash.exe'
    : 'bash';

describe('Autenticação do deploy Cloud Run', () => {
  it.each([
    ['chave JSON', 'test-key', '', '', 'key'],
    ['Workload Identity', '', 'test-provider', 'test-account', 'wif'],
    ['prioridade da chave', 'test-key', 'test-provider', 'test-account', 'key'],
    ['sem configuração', '', '', '', null],
    ['sem conta de serviço', '', 'test-provider', '', null],
    ['sem provedor', '', '', 'test-account', null],
  ])('%s', (_, key, provider, account, mode) => {
    const directory = mkdtempSync(join(tmpdir(), 'appmy-deploy-test-'));
    const output = join(directory, 'output');
    try {
      const result = spawnSync(bashExecutable, ['-e', '-c', script], {
        encoding: 'utf8',
        env: {
          ...process.env,
          GCP_SA_KEY: key!,
          GCP_WORKLOAD_IDENTITY_PROVIDER: provider!,
          GCP_SERVICE_ACCOUNT: account!,
          GITHUB_OUTPUT: output.replace(/\\/g, '/'),
        },
      });
      expect(result.status).toBe(mode ? 0 : 1);
      if (mode) {
        expect(readFileSync(output, 'utf8').replace(/\r\n/g, '\n')).toBe(`mode=${mode}\n`);
      } else {
        expect(result.stdout).toContain('::error::Configure GCP_SA_KEY');
      }
      for (const value of [key, provider, account].filter(Boolean)) {
        expect(result.stdout + result.stderr).not.toContain(value);
      }
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });

  it('conecta os secrets à validação e seleciona apenas a autenticação correspondente antes do gcloud', () => {
    expect(validation).toContain('id: auth-config');
    for (const name of ['GCP_SA_KEY', 'GCP_WORKLOAD_IDENTITY_PROVIDER', 'GCP_SERVICE_ACCOUNT']) {
      expect(validation).toContain(`${name}: \${{ secrets.${name} }}`);
    }
    expect(workflow).toContain("if: steps.auth-config.outputs.mode == 'key'\n        uses: google-github-actions/auth@v2\n        with:\n          credentials_json: ${{ secrets.GCP_SA_KEY }}");
    expect(workflow).toContain("if: steps.auth-config.outputs.mode == 'wif'\n        uses: google-github-actions/auth@v2\n        with:\n          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}\n          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}");
    expect(workflow).toContain('id-token: write');
    expect(workflow.indexOf('id: auth-config')).toBeLessThan(workflow.indexOf('uses: google-github-actions/auth@v2'));
    expect(workflow.lastIndexOf('uses: google-github-actions/auth@v2')).toBeLessThan(workflow.indexOf('uses: google-github-actions/setup-gcloud@v2'));
    expect(workflow).not.toContain("if: env.GCP_SA_KEY");
  });

  it.each(['.gitignore', '.gcloudignore', '.dockerignore'])('exclui credenciais temporárias em %s', (file) => {
    const contents = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
    expect(contents.split(/\r?\n/)).toContain('gha-creds-*.json');
  });
});
