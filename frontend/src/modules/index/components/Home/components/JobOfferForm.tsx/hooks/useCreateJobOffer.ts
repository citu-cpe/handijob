import { CreateJobOfferDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../../../shared/providers/ApiProvider';

export const useCreateJobOffer = (onClose?: () => void) => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (createJobOfferDTO: CreateJobOfferDTO) =>
      api.createJobOffer(createJobOfferDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobOffers');

        if (onClose) {
          onClose();
        }
      },
    }
  );
};
