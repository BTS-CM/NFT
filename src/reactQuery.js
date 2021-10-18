import { useEffect } from "react";
import { useQuery } from 'react-query';
const axios = require('axios');

function useQueryHook(
  url,
  queryName,
  functionToSet,
  queryConfig={}
) {
  const { data, error, isFetching } = useQuery(
    queryName,
    async () => {
      let response = await axios.get(url);
      return response.data;
    },
    queryConfig
  );

  useEffect(() => {
    if (data && !isFetching && !error) {
      functionToSet(data);
    }
  }, [data, isFetching, error, functionToSet]);
}

export {
  useQueryHook
};
