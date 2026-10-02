import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

const workflow = readFileSync(new URL('../.github/workflows/deploy.yml', import.meta.url), 'utf8');
const steps = workflow.split(/^\s{6}- name: /m).slice(1);

describe('Cloud Run deployment workflow', () => {
  it('requires service account authentication without a conditional skip', () => {
    const auth = steps.find((step) => step.includes('uses: google-github-actions/auth@'));

    expect(auth).toBeDefined();
    expect(auth).toContain('credentials_json: ${{ secrets.GCP_SA_KEY }}');
    expect(auth).not.toMatch(/^\s*if:/m);
  });

  it('authenticates before configuring gcloud and deploying', () => {
    const authIndex = steps.findIndex((step) => step.includes('uses: google-github-actions/auth@'));
    const setupIndex = steps.findIndex((step) => step.includes('uses: google-github-actions/setup-gcloud@'));
    const deployIndex = steps.findIndex((step) => step.includes('gcloud run deploy'));

    expect(authIndex).toBeGreaterThanOrEqual(0);
    expect(setupIndex).toBeGreaterThan(authIndex);
    expect(deployIndex).toBeGreaterThan(setupIndex);
  });

  it.each(['.gitignore', '.gcloudignore', '.dockerignore'])(
    'excludes generated Google credentials in %s',
    (file) => {
      const contents = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');

      expect(contents.split(/\r?\n/)).toContain('gha-creds-*.json');
    },
  );
});
