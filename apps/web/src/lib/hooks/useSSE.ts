import { useEffect, useState } from 'react';

export function useSSE(url: string) {
  const [data, setData] = useState<string>('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      setData((prev) => prev + event.data);
    };

    eventSource.onerror = () => {
      setIsError(true);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { data, isError };
}
