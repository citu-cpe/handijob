import { UserDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useGetProfile = (username: string) => {
  const api = useContext(ApiContext);

  const query = useQuery(['profile', username], () =>
    api.getUserProfile(username)
  );
  let profile: UserDTO | undefined;

  const { data } = query;

  if (data) {
    profile = data.data;
  }

  return {
    ...query,
    profile,
  };
};
