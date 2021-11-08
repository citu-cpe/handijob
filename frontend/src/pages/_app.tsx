import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ApiProvider } from '../shared/providers/ApiProvider';
import { useGlobalStore } from '../shared/stores';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { UserDTO } from 'generated-api';
import { Navbar } from '../modules/index/components/Navbar/Navbar';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserDTO | undefined>(undefined);
  const getUser = useGlobalStore((state) => state.getUser);
  const router = useRouter();

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  if (pageProps.protected && user) {
    router.push('/login');
  }

  if (pageProps.dontShowUser && user) {
    router.replace('/');
  }

  return (
    <ChakraProvider>
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          <Navbar positionFixed loggedIn={!!user} />
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ApiProvider>
    </ChakraProvider>
  );
}

export default MyApp;
