import { Box, Divider, Skeleton, SkeletonText, Wrap } from '@chakra-ui/react';
import React from 'react';

export const JobOpeningSkeleton = () => {
  return (
    <Box p='8' rounded='md' bg='white' mb='4' w='100%' shadow='md'>
      <Skeleton height='10' />
      <Wrap mt='4'>
        <Skeleton width='10' height='5' />
        <Skeleton width='20' height='5' />
        <Skeleton width='10' height='5' />
        <Skeleton width='24' height='5' />
      </Wrap>
      <Divider my='4' />
      <SkeletonText noOfLines={4} spacing='4' mb='4' />
      <Skeleton height='md' />
    </Box>
  );
};
