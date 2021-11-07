import { Box, Center, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export const Hero = () => {
  return (
    <Box h='85vh' w='100%'>
      <Center h='100%' w='100%' flexDir='column'>
        <Heading display='block'>Welcome to HandiJob</Heading>
        <Text>The best place for freelancers and employers</Text>
        <Text>Apply Now !</Text>
      </Center>
    </Box>
  );
};
