import { FreelancerDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

interface DeleteJobApplicationDTO {
  jobApplicationId: string;
  freelancerDTO: FreelancerDTO;
}

export const useDeleteJobApplication = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    ({ jobApplicationId, freelancerDTO }: DeleteJobApplicationDTO) =>
      api.deleteJobApplication(jobApplicationId, freelancerDTO),

    { onSuccess: () => queryClient.invalidateQueries('jobOpenings') }
  );
};
