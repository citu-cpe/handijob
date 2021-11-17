import { Flex, Box, Link, Container, Button, Img } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import { useLogout } from '../../../../modules/index/hooks/useLogout';

interface NavbarProps {
  positionFixed?: boolean;
  loggedIn?: boolean;
}

export const Navbar = ({ positionFixed, loggedIn }: NavbarProps) => {
  const { mutate: logout, isLoading } = useLogout();

  return (
    <Box
      as='nav'
      position={positionFixed ? 'fixed' : 'relative'}
      top='0'
      left='0'
      w='100%'
      bgColor='white'
      shadow='md'
      zIndex='100'
    >
      <Container maxW='container.xl'>
        <Flex justifyContent='space-between' alignItems='center' paddingY='4'>
          <Box>
            <NextLink href='/' passHref>
              <Link>
                <Img src='/logo-text.png' w='25%' />
              </Link>
            </NextLink>
          </Box>
          <Box>
            {loggedIn ? (
              <>
                <Button
                  mr='4'
                  colorScheme='teal'
                  variant='ghost'
                  py='4'
                  px='8'
                  rounded='full'
                  onClick={() => logout()}
                  isLoading={isLoading}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <NextLink href='/login' passHref>
                  <Link
                    mr='4'
                    bg='teal.50'
                    color='teal.500'
                    py='4'
                    px='8'
                    rounded='full'
                  >
                    Log In
                  </Link>
                </NextLink>
                <NextLink href='/register' passHref>
                  <Link
                    mr='4'
                    bg='teal.500'
                    color='teal.50'
                    py='4'
                    px='8'
                    rounded='full'
                  >
                    Register
                  </Link>
                </NextLink>
              </>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
