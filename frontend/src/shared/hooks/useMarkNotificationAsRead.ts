import { NotificationDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../providers/ApiProvider';

export const useMarkNotificationAsRead = () => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (notificationDTO: NotificationDTO) =>
      api.markNotifcationAsRead(notificationDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notifications');
      },
    }
  );
};
