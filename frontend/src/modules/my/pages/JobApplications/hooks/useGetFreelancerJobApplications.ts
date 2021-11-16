import { JobApplicationDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useGetFreelancerJobApplications = (freelancerId: string) => {
  const api = useContext(ApiContext);

  const query = useQuery('freelancerJobApplications', () =>
    api.getJobApplicationsByFreelancer(freelancerId)
  );
  let jobApplications: JobApplicationDTO[] = [];

  const { data } = query;

  if (data) {
    jobApplications = data.data;
  }

  return {
    ...query,
    jobApplications,
  };
};
