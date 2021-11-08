import { JobOfferDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useDeleteJobOffer = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (jobOfferDTO: JobOfferDTO) => api.deleteJobOffer(jobOfferDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobOffers');
      },
    }
  );
};
