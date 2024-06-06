import { useCallback, useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const fetch = useCallback((url: string) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setData({});
    }, 2000);

    console.log(url);
  }, []);

  return {
    loading,
    data,
    fetch,
  };
};

export default useFetch;

