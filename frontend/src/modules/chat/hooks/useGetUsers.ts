import { UserDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useGetUsers = () => {
  const api = useContext(ApiContext);

  const query = useQuery('users', () => api.getUsers());
  let users: UserDTO[] = [];

  const { data } = query;

  if (data) {
    users = data.data;
  }

  return {
    ...query,
    users,
  };
};
