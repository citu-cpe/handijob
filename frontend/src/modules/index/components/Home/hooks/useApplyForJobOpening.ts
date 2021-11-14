import { useToast } from '@chakra-ui/react';
import { CreateJobApplicationDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useApplyForJobOpening = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (createJobApplicationDTO: CreateJobApplicationDTO) =>
      api.createJobApplication(createJobApplicationDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('jobOpenings');
        toast({
          status: 'success',
          title: 'Successfully applied for job opening!',
          isClosable: true,
          variant: 'subtle',
        });
      },
    }
  );
};
