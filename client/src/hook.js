import { useEffect, useState } from "react";
import { makeRequest } from "./axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await makeRequest.get(url);
        setData(res.data);
      } catch (error) {
        setError(true);
      }

      setLoading(false);
    };
    fetchData();
  }, [url]);

  const refetch = async () => {
    setLoading(true);

    try {
      const res = await makeRequest.get(url);
      setData(res.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
