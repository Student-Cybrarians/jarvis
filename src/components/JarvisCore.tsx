import type { JarvisActivity } from '../types/sensing';

interface JarvisCoreProps {
  activity: JarvisActivity;
  presenceCount: number;
  confidence: number;
  connection: string;
}

export function JarvisCore({
  activity,
  presenceCount,
  confidence,
  connection,
}: JarvisCoreProps) {
  const detected = presenceCount > 0;
  const stateLabel = connection === 'connected'
    ? detected
      ? activity === 'fall'
        ? 'CRITICAL — FALL DETECTED'
        : 'HUMAN DETECTED · ' + activity.toUpperCase()
      : 'SCANNING — NO HUMAN'
    : connection.toUpperCase();

  return (
    <section className={'jarvis-core jarvis-core--' + activity + (detected ? ' jarvis-core--detected' : '')} aria-live="polite">
      <div className="jarvis-core__rings" aria-hidden="true">
        <div className="jarvis-ring jarvis-ring--outer" />
        <div className="jarvis-ring jarvis-ring--middle" />
        <div className="jarvis-ring jarvis-ring--inner" />
        <div className="jarvis-scan" />
      </div>
      <div className="jarvis-core__center">
        <span className="jarvis-core__eyebrow">JARVIS SENSING CORE</span>
        <strong className="jarvis-core__state">{stateLabel}</strong>
        <span className="jarvis-core__confidence">
          {detected ? (confidence * 100).toFixed(1) + '% CONFIDENCE' : 'RF FIELD NOMINAL'}
        </span>
        <span className="jarvis-core__count">{detected ? presenceCount : '—'}</span>
        <span className="jarvis-core__caption">{detected ? 'HUMAN PRESENCE' : 'OCCUPANCY'}</span>
      </div>
    </section>
  );
}
