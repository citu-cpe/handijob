import { Flex, Box, Heading, Link, Container } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

interface NavbarProps {
  positionFixed?: boolean;
}

export const Navbar = ({ positionFixed }: NavbarProps) => {
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
            <NextLink href='/login' passHref>
              <Link mr='4'>Log In</Link>
            </NextLink>
            <NextLink href='/register' passHref>
              <Link mr='4'>Register</Link>
            </NextLink>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
