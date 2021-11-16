import { Flex } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { useGlobalStore } from '../../../stores';
import { Navbar } from '../Navbar/Navbar';
import { SideNavbar } from '../SideNavbar/SideNavbar';

interface LayoutProps {
  loggedIn?: boolean;
}

export const Layout = ({ children }: React.PropsWithChildren<LayoutProps>) => {
  const user = useGlobalStore((state) => state.user);
  const navbarHeight = useGlobalStore((state) => state.navbarHeight);

  return (
    <>
      <Navbar positionFixed loggedIn={!!user} />
      {!!user ? (
        <Flex
          mt={+navbarHeight.split('px')[0] + 50 + 'px'}
          justifyContent='space-between'
        >
          <Flex flexBasis='30%'>
            <aside style={{ width: '100%' }}>
              <SideNavbar />
            </aside>
          </Flex>
          <Flex justifyContent='center' flexBasis='70%'>
            <main style={{ width: '90%' }}>{children}</main>
          </Flex>
        </Flex>
      ) : (
        <main style={{ marginTop: +navbarHeight.split('px')[0] + 50 + 'px' }}>
          {children}
        </main>
      )}
    </>
  );
};

export const defaultGetLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
