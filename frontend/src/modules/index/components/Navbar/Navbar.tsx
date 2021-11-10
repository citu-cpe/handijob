import { Flex, Box, Link, Container, Image } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogout } from '../../hooks/useLogout';
import { useGlobalStore } from '../../../../shared/stores';

interface NavbarProps {
  positionFixed?: boolean;
  loggedIn?: boolean;
}

export const Navbar = ({ positionFixed, loggedIn }: NavbarProps) => {
  const logout = useLogout().mutate;
  const navbarHeight = useGlobalStore((state) => state.navbarHeight);

  return (
    <Box
      as='nav'
      position={positionFixed ? 'fixed' : 'relative'}
      top='0'
      left='0'
      w='100%'
      h={navbarHeight}
    >
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center' paddingY='4'>
          <Box>
            <Image
              src='https://i.ibb.co/S5v61zN/Handi-Job-logo.png'
              alt='Handi-Job-logo'
              border='0'
              style={{ height: navbarHeight }}
            />
          </Box>
          <Box>
            {loggedIn ? (
              <>
                <Link mr='4' onClick={() => logout()}>
                  Log Out
                </Link>
              </>
            ) : (
              <>
                <NextLink href='/login' passHref>
                  <Link mr='4'>Log In</Link>
                </NextLink>
                <NextLink href='/register' passHref>
                  <Link mr='4'>Register</Link>
                </NextLink>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
