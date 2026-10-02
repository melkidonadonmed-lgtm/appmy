import React, { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Activity, Cpu, Layers } from 'lucide-react';

export function TelemetryCollector({ onUpdate }: { onUpdate: (data: { fps: number; triangles: number; drawCalls: number }) => void }) {
  const { gl } = useThree();

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const loop = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 500) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const info = gl.info;
        onUpdate({
          fps,
          triangles: info.render.triangles,
          drawCalls: info.render.calls,
        });
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gl, onUpdate]);

  useFrame(() => {});

  return null;
}

export const TelemetryOverlay: React.FC<{
  fps: number;
  triangles: number;
  drawCalls: number;
}> = ({ fps, triangles, drawCalls }) => {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        className="telemetry-toggle-btn"
        title="Exibir Telemetria 3D"
      >
        <Activity size={14} /> 60 FPS
      </button>
    );
  }

  const fpsColor = fps >= 55 ? '#22c55e' : fps >= 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className="telemetry-badge">
      <div className="telemetry-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <Activity size={14} color={fpsColor} />
          <span style={{ fontWeight: 600, color: fpsColor }}>{fps} FPS</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="telemetry-close"
          title="Minimizar"
        >
          ×
        </button>
      </div>

      <div className="telemetry-row">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
          <Layers size={12} /> Polígonos
        </span>
        <span style={{ fontWeight: 500 }}>{triangles.toLocaleString()}</span>
      </div>

      <div className="telemetry-row">
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
          <Cpu size={12} /> Draw Calls
        </span>
        <span style={{ fontWeight: 500 }}>{drawCalls}</span>
      </div>

      <div className="telemetry-footer">
        <span className="status-dot" style={{ backgroundColor: fpsColor, width: 6, height: 6 }}></span>
        <span>VRAM Alvo: &lt; 200 MB</span>
      </div>
    </div>
  );
};
