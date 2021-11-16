import { Box, Flex, Skeleton } from '@chakra-ui/react';
import React from 'react';

export const JobApplicationSkeleton = () => {
  return (
    <Flex
      w='100%'
      alignItems='center'
      justifyContent='space-between'
      bgColor='white'
      rounded='md'
      shadow='md'
      pr='8'
      minH='32'
      mb='4'
    >
      <Box flexBasis='20%' p='4'>
        <Skeleton width='100%' height='20' />
      </Box>

      <Box flexBasis='50%' justifySelf='start' px='10'>
        <Skeleton width='100%' height='5' />
      </Box>

      <Box flexBasis='30%' px='24'>
        <Skeleton width='100%' height='5' />
      </Box>
    </Flex>
  );
};
