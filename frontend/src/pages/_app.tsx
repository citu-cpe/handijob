import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiProvider } from '../shared/providers/ApiProvider';
import { useGlobalStore } from '../shared/stores';
import { useRouter } from 'next/router';
import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { defaultGetLayout } from '../shared/components/layout/Layout/Layout';
import { LocalStorageKeys } from '../shared/enums/localStorageKeys';
import { LoginResponseDTO, UserDTO } from 'generated-api';
import { theme } from '../shared/theme';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/900.css';
import '@fontsource/montserrat/400.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const user = useGlobalStore((state) => state.user);
  const loginUser = useGlobalStore((state) => state.loginUser);
  const logoutUser = useGlobalStore((state) => state.logoutUser);
  const router = useRouter();
  const getLayout = Component.getLayout ?? defaultGetLayout;

  useEffect(() => {
    const userString = localStorage.getItem(LocalStorageKeys.USER);
    let userDTO: UserDTO;

    if (userString) {
      userDTO = JSON.parse(userString);
    } else {
      return logoutUser();
    }

    const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)!;
    const refreshToken = localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN)!;

    const data: LoginResponseDTO = {
      user: userDTO,
      accessToken,
      refreshToken,
    };

    loginUser(data);
  }, [loginUser, logoutUser]);

  if (pageProps.protected && user) {
    router.push('/login');
  }

  if (pageProps.dontShowUser && user) {
    router.replace('/');
  }

  return (
    <ChakraProvider theme={theme}>
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
