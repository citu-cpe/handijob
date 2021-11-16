import { useContext } from 'react';
import { useMutation } from 'react-query';
import { LoginUserDTO } from 'generated-api';
import { ApiContext } from '../../../shared/providers/ApiProvider';
import { useGlobalStore } from '../../../shared/stores';
import { useRouter } from 'next/router';

export const useLogin = () => {
  const api = useContext(ApiContext);
  const loginUser = useGlobalStore((state) => state.loginUser);
  const router = useRouter();

  return useMutation((loginDTO: LoginUserDTO) => api.logIn(loginDTO), {
    onSuccess: ({ data }) => {
      loginUser(data);
      router.push('/');
    },
  });
};
