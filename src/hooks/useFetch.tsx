import { useEffect, useState } from "react";
import { UserData } from "../type";

const useFetch = (dataLength: number) => {
  const [data, setData] = useState<UserData[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(dataLength: number) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=0&size=${dataLength}`
      );
      const { data } = await response.json();
      if (data) {
        setData(data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData(dataLength); // Fetch data when the dataLength value changes
  }, [dataLength]);

  return { data, isLoading }; // Return the fetched data and loading state
};

export default useFetch;
