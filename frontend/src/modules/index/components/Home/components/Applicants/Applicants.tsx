import { Box, Divider, Flex, Heading, Img } from '@chakra-ui/react';
import React from 'react';
import { useGetApplicants } from '../../../../../my/pages/JobOpenings/hooks/useGetApplicants';
import { ApplicantsSkeleton } from './ApplicantsSkeleton';

interface ApplicantsProps {
  jobOpeningId: string;
}

export const Applicants = ({ jobOpeningId }: ApplicantsProps) => {
  const { applicants, isLoading } = useGetApplicants(jobOpeningId);

  return (
    <Box>
      {isLoading && (
        <>
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
        </>
      )}
      {applicants.map((a) => (
        <>
          <Flex>
            <Box w='10' h='10' rounded='full' overflow='hidden' mr='4'>
              <Img
                src={
                  a.imageUrl ||
                  'https://i0.wp.com/grocapitus.com/wp-content/uploads/placeholder-profile-male-500x500.png'
                }
                cursor='pointer'
              />
            </Box>
            <Heading key={a.username} size='lg'>
              @{a.username}
            </Heading>
          </Flex>
          <Divider my='4' />
        </>
      ))}
    </Box>
  );
};
