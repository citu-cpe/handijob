import { Flex, Box, Heading, Link, Container } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogout } from '../../hooks/useLogout';

interface NavbarProps {
  positionFixed?: boolean;
  loggedIn?: boolean;
}

export const Navbar = ({ positionFixed, loggedIn }: NavbarProps) => {
  const logout = useLogout().mutate;

  return (
    <Box
      as='nav'
      position={positionFixed ? 'fixed' : 'relative'}
      top='0'
      left='0'
      w='100%'
    >
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center' paddingY='4'>
          <Box>
            <Heading>HandiJob</Heading>
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
