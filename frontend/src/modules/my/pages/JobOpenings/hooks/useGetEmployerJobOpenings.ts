import { JobOpeningDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useGetEmployerJobOpenings = (employerId: string) => {
  const api = useContext(ApiContext);

  const query = useQuery('employerJobOpenings', () =>
    api.getJobOpeningsByEmployer(employerId)
  );
  let jobOpenings: JobOpeningDTO[] = [];

  const { data } = query;

  if (data) {
    jobOpenings = data.data;
  }

  return {
    ...query,
    jobOpenings,
  };
};
