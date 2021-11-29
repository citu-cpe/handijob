import { NotificationsDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../providers/ApiProvider';

export const useGetNotifications = () => {
  const api = useContext(ApiContext);

  const query = useQuery('notifications', () => api.getNotifications());
  let notificationsDTO: NotificationsDTO | undefined;

  const { data } = query;

  if (data) {
    notificationsDTO = data.data;
  }

  return {
    ...query,
    notificationsDTO,
  };
};
