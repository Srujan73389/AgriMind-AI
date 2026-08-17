import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
  const [data, setData] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => setIsConnected(true);
    ws.current.onclose = () => setIsConnected(false);
    ws.current.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
      } catch (e) {
        setData(event.data);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const send = (message: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(typeof message === 'string' ? message : JSON.stringify(message));
    }
  };

  return { data, isConnected, send };
}
