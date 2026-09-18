import { useEffect, useState } from 'react';
import { Activity, Radio, ShieldCheck, Wifi } from 'lucide-react';
import { JarvisCore } from '../components/JarvisCore';
import { connectJarvisRealtime } from '../lib/jarvis-realtime';
import type { JarvisEvent, JarvisState } from '../types/sensing';

const initialState: JarvisState = {
  connection: 'offline',
  presenceCount: 0,
  confidence: 0,
  activity: 'idle',
  lastEvent: 'Waiting for sensing backend',
  sequence: 0,
};

export function DashboardPage() {
  const [state, setState] = useState<JarvisState>(initialState);

  useEffect(() => {
    return connectJarvisRealtime({
      onStatus: (connection) => setState((current) => ({ ...current, connection })),
      onEvent: (event: JarvisEvent) => {
        setState((current) => {
          if (event.sequence < current.sequence) return current;
          return {
            ...current,
            presenceCount: event.presence?.count ?? current.presenceCount,
            confidence: event.presence?.confidence ?? event.activity?.confidence ?? current.confidence,
            activity: event.activity?.current ?? current.activity,
            lastEvent: event.event,
            sequence: event.sequence,
          };
        });
      },
    });
  }, []);

  const connectionLabel = state.connection === 'connected' ? 'LIVE' : state.connection.toUpperCase();

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.18em]" style={{ color: 'var(--color-accent)' }}>
              <span className="hud-heartbeat" />
              JARVIS / SENSING COMMAND
            </div>
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>Wi-Fi Human Detection</h1>
            <p className="mt-1 max-w-2xl text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Real-time CSI telemetry, presence inference, activity classification, and sensor health.
            </p>
          </div>
          <div className="hud-panel px-4 py-3 text-xs" style={{ minWidth: 150 }}>
            <div className="hud-label">BACKEND LINK</div>
            <div className="mt-1 flex items-center gap-2 font-mono" style={{ color: state.connection === 'connected' ? 'var(--color-success)' : 'var(--color-warning)' }}>
              <span className="h-2 w-2 rounded-full" style={{ background: 'currentColor' }} />
              {connectionLabel}
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="hud-panel min-h-[620px] p-4 md:p-8">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="hud-label">RF FIELD / ROOM 01</span>
              <span className="hud-mono" style={{ color: 'var(--color-text-tertiary)' }}>SEQ {state.sequence.toString().padStart(6, '0')}</span>
            </div>
            <div className="flex min-h-[540px] items-center justify-center">
              <JarvisCore activity={state.activity} presenceCount={state.presenceCount} confidence={state.confidence} connection={state.connection} />
            </div>
          </div>

          <aside className="grid gap-4 content-start">
            <div className="hud-panel p-4">
              <div className="mb-4 flex items-center gap-2"><Radio size={15} style={{ color: 'var(--color-accent)' }} /><span className="hud-label">PRESENCE</span></div>
              <div className="text-4xl font-semibold hud-mono">{state.presenceCount}</div>
              <div className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>humans detected</div>
            </div>

            <div className="hud-panel p-4">
              <div className="mb-4 flex items-center gap-2"><Activity size={15} style={{ color: 'var(--color-accent-purple)' }} /><span className="hud-label">ACTIVITY</span></div>
              <div className="text-2xl font-semibold uppercase">{state.activity}</div>
              <div className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>last event: {state.lastEvent}</div>
            </div>

            <div className="hud-panel p-4">
              <div className="mb-4 flex items-center gap-2"><ShieldCheck size={15} style={{ color: 'var(--color-success)' }} /><span className="hud-label">MODEL CONFIDENCE</span></div>
              <div className="text-4xl font-semibold hud-mono">{(state.confidence * 100).toFixed(1)}%</div>
              <div className="mt-3 h-1 overflow-hidden rounded-full" style={{ background: 'var(--color-border)' }}>
                <div className="h-full rounded-full" style={{ width: Math.max(2, state.confidence * 100) + '%', background: 'var(--color-accent)' }} />
              </div>
            </div>

            <div className="hud-panel p-4">
              <div className="mb-4 flex items-center gap-2"><Wifi size={15} style={{ color: 'var(--color-accent-amber)' }} /><span className="hud-label">SENSOR LINK</span></div>
              <div className="font-mono text-sm">CSI-001 / ROOM-01</div>
              <div className="mt-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {state.connection === 'connected' ? 'Telemetry stream active' : 'Set VITE_JARVIS_WS_URL to connect'}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
