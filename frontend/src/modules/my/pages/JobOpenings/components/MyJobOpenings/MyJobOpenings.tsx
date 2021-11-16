import { Box } from '@chakra-ui/react';
import React from 'react';
import { JobOpening } from '../../../../../index/components/Home/components/JobOpening/JobOpening';
import { useGetEmployerJobOpenings } from '../../hooks/useGetEmployerJobOpenings';

interface MyJobOpeningsProps {
  employerId: string;
}

export const MyJobOpenings = ({ employerId }: MyJobOpeningsProps) => {
  const { jobOpenings } = useGetEmployerJobOpenings(employerId);

  return (
    <Box>
      {jobOpenings.map((j) => (
        <JobOpening key={j.id} jobOpening={j} />
      ))}
    </Box>
  );
};
