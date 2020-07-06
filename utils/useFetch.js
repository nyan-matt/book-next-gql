import { useState, useEffect } from "react";

export default function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch(url, { ...options, signal: abortController.signal });
        const json = await res.json();

        setData(json);
      } catch (error) {
        if (abortController.signal.aborted) {
          console.log('Component not mounted, fetch aborted...');
        } else {
          setError(error);
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return { data, error };
}
