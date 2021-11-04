import { VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { Hero } from '../Hero/Hero';
import { Navbar } from '../Navbar/Navbar';
import { Team } from '../Team/Team';

export const Landing = () => {
  return (
    <>
      <Navbar positionFixed />
      <Box mt='75px' pb='50'>
        <VStack spacing='0'>
          <Hero />
          <Team />
        </VStack>
      </Box>
    </>
  );
};
