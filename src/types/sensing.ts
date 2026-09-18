export type JarvisActivity =
  | 'idle'
  | 'standing'
  | 'walking'
  | 'running'
  | 'sitting'
  | 'fall';

export interface JarvisEvent {
  event: string;
  event_version: number;
  event_id: string;
  sequence: number;
  timestamp: string;
  device_id: string;
  presence?: { count: number; confidence: number };
  activity?: {
    previous?: string | null;
    current: JarvisActivity;
    confidence: number;
  };
}

export interface JarvisState {
  connection: 'connecting' | 'connected' | 'reconnecting' | 'offline';
  presenceCount: number;
  confidence: number;
  activity: JarvisActivity;
  lastEvent: string;
  sequence: number;
}
