import { UserDTO } from 'generated-api';
// import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { LocalStorageKeys } from '../../../shared/enums/localStorageKeys';
import { ApiContext } from '../../../shared/providers/ApiProvider';
import { useGlobalStore } from '../../../shared/stores';

export const useLogout = () => {
  const api = useContext(ApiContext);
  const removeUser = useGlobalStore((state) => state.removeUser);
  // const router = useRouter();
  const [user, setUser] = useState<UserDTO | undefined>(undefined);
  const getUser = useGlobalStore((state) => state.getUser);

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  return useMutation(() => api.logOut(user!), {
    onSuccess: () => {
      removeUser();

      localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);

      // router.push('/login');
      window.location.href = '/login';
    },
  });
};
