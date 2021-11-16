import { Box, Divider, Heading } from '@chakra-ui/react';
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
          <Heading key={a.username} size='lg'>
            @{a.username}
          </Heading>
          <Divider my='4' />
        </>
      ))}
    </Box>
  );
};
