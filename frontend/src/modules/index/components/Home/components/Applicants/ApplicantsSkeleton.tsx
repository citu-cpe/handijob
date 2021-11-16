import { Divider, Skeleton } from '@chakra-ui/react';
import React from 'react';

export const ApplicantsSkeleton = () => {
  return (
    <>
      <Skeleton h='10' />
      <Divider my='4' />
    </>
  );
};
