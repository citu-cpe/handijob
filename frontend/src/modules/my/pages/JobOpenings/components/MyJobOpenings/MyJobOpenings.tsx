import { Box } from '@chakra-ui/react';
import React from 'react';
import { JobOpening } from '../../../../../index/components/Home/components/JobOpening/JobOpening';
import { JobOpeningSkeleton } from '../../../../../index/components/Home/components/JobOpeningSkeleton/JobOpeningSkeleton';
import { useGetEmployerJobOpenings } from '../../hooks/useGetEmployerJobOpenings';

interface MyJobOpeningsProps {
  employerId: string;
}

export const MyJobOpenings = ({ employerId }: MyJobOpeningsProps) => {
  const { jobOpenings, isLoading } = useGetEmployerJobOpenings(employerId);

  return (
    <Box>
      {isLoading && <JobOpeningSkeleton />}
      {jobOpenings.map((j) => (
        <JobOpening key={j.id} jobOpening={j} />
      ))}
    </Box>
  );
};
