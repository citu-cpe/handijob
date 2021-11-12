import { JobOpeningDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useGetJobOpenings = () => {
  const api = useContext(ApiContext);

  const query = useQuery('jobOpenings', () => api.getAllJobOpenings());
  const { data } = query;
  let jobOpenings: JobOpeningDTO[] = [];

  if (data) {
    jobOpenings = data.data;
  }

  return {
    ...query,
    jobOpenings,
  };
};
