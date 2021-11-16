import { UserDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useGetApplicants = (jobOpeningId: string) => {
  const api = useContext(ApiContext);

  const query = useQuery(['applicants', jobOpeningId], () =>
    api.getApplicants(jobOpeningId)
  );
  let applicants: UserDTO[] = [];

  const { data } = query;

  if (data) {
    applicants = data.data;
  }

  return {
    ...query,
    applicants,
  };
};
