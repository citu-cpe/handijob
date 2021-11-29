import { useToast } from '@chakra-ui/react';
import { JobOpeningDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useArchiveJobOpening = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation(
    (jobOpeningDTO: JobOpeningDTO) => {
      jobOpeningDTO.archived = !jobOpeningDTO.archived;
      return api.archiveJobOpening(jobOpeningDTO);
    },
    {
      onSuccess: (_, jobOpeningDTO) => {
        queryClient.invalidateQueries('jobOpenings');

        const title = jobOpeningDTO.archived
          ? 'Successfully archived job opening'
          : 'Successfully unarchived job opening';
        const description = jobOpeningDTO.archived
          ? 'Your job opening will no longer be shown in the home page'
          : 'Your job opening will now be shown on the home page';

        toast({
          status: 'info',
          title,
          description,
          isClosable: true,
          variant: 'subtle',
        });
      },
    }
  );
};
