import { Box } from '@chakra-ui/react';
import React from 'react';
import { useGetFreelancerJobApplications } from '../../hooks/useGetFreelancerJobApplications';
import { JobApplication } from '../JobApplication/JobApplication';

interface MyJobApplicationsProps {
  freelancerId: string;
}

export const MyJobApplications = ({ freelancerId }: MyJobApplicationsProps) => {
  const { jobApplications } = useGetFreelancerJobApplications(freelancerId);

  return (
    <Box>
      {jobApplications.map((j) => (
        <JobApplication key={j.id} jobApplication={j} />
      ))}
    </Box>
  );
};
