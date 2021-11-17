import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';
import { useGlobalStore } from '../../../shared/stores';

export const useLogout = () => {
  const api = useContext(ApiContext);
  const user = useGlobalStore((state) => state.user);
  const logoutUser = useGlobalStore((state) => state.logoutUser);
  const router = useRouter();

  return useMutation(() => api.logOut(user!), {
    onSuccess: () => {
      logoutUser();
      router.push('/');
    },
  });
};
