import type { JarvisEvent } from '../types/sensing';

export interface JarvisRealtimeOptions {
  url?: string;
  onEvent: (event: JarvisEvent) => void;
  onStatus: (status: 'connecting' | 'connected' | 'reconnecting' | 'offline') => void;
}

export function connectJarvisRealtime(options: JarvisRealtimeOptions): () => void {
  const configured = options.url || import.meta.env.VITE_JARVIS_WS_URL;
  if (!configured) {
    options.onStatus('offline');
    return () => {};
  }

  let socket: WebSocket | null = null;
  let stopped = false;
  let retry = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const connect = () => {
    if (stopped) return;
    options.onStatus(retry === 0 ? 'connecting' : 'reconnecting');
    socket = new WebSocket(configured);

    socket.onopen = () => {
      retry = 0;
      options.onStatus('connected');
      socket?.send(JSON.stringify({ type: 'subscribe', channels: ['system', 'detection', 'activity', 'alerts', 'sensors'] }));
    };

    socket.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data) as JarvisEvent;
        options.onEvent(event);
      } catch {
        // Ignore malformed realtime frames; the connection remains alive.
      }
    };

    socket.onerror = () => socket?.close();

    socket.onclose = () => {
      if (stopped) return;
      options.onStatus('reconnecting');
      const delay = Math.min(30000, 1000 * 2 ** retry);
      retry = Math.min(retry + 1, 5);
      timer = setTimeout(connect, delay);
    };
  };

  connect();

  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
    socket?.close();
  };
}
