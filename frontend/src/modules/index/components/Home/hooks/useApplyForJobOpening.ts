import { useToast } from '@chakra-ui/react';
import { CreateJobApplicationDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { WebSocketEvents } from '../../../../../shared/enums/webSocketEvents';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';
import { SocketContext } from '../../../../../shared/providers/SocketProvider';

export const useApplyForJobOpening = () => {
  const api = useContext(ApiContext);
  const socket = useContext(SocketContext);
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

        socket?.emit(WebSocketEvents.APPLY_JOB_OPENING, {
          userId: 'test user id',
          content: 'test content',
        });
      },
    }
  );
};
