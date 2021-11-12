import { CreateJobOpeningDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../../../shared/providers/ApiProvider';

export const useCreateJobOpening = (onClose?: () => void) => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (createJobOpeningDTO: CreateJobOpeningDTO) =>
      api.createJobOpening(createJobOpeningDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobOpenings');

        if (onClose) {
          onClose();
        }
      },
    }
  );
};
