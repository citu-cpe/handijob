import { JobOpeningDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useDeleteJobOpening = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (jobOpeningDTO: JobOpeningDTO) => api.deleteJobOpening(jobOpeningDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobOpenings');
      },
    }
  );
};
