import axios, { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';

const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>();

  const fetch = useCallback(async (url: string, type: string, retry: number) => {
    let result: AxiosResponse<any> | undefined;
    setLoading(true);

    try {
      // 이후 재요청 type에 따라 코드가 달라짐
      console.log(type, retry);
      result = await axios.get(url);
    } catch (err) {
      setLoading(false);
      setData(err);
      return;
    }

    setLoading(false);
    setData(result?.data);
  }, []);

  return {
    loading,
    data,
    fetch,
  };
};

export default useFetch;

