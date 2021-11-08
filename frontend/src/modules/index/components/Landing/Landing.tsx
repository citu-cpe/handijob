import { VStack, Box } from '@chakra-ui/react';
import React from 'react';
import { useGlobalStore } from '../../../../shared/stores';
import { Hero } from '../Hero/Hero';
import { Team } from '../Team/Team';

export const Landing = () => {
  const navbarHeight = useGlobalStore((state) => state.navbarHeight);

  return (
    <>
      <Box mt={navbarHeight} pb='50'>
        <VStack spacing='0'>
          <Hero />
          <Team />
        </VStack>
      </Box>
    </>
  );
};
