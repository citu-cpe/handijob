import { Box } from '@chakra-ui/react';
import React from 'react';
import { useGetFreelancerJobApplications } from '../../hooks/useGetFreelancerJobApplications';
import { JobApplication } from '../JobApplication/JobApplication';
import { JobApplicationSkeleton } from '../JobApplicationSkeleton/JobApplicationSkeleton';

interface MyJobApplicationsProps {
  freelancerId: string;
}

export const MyJobApplications = ({ freelancerId }: MyJobApplicationsProps) => {
  const { jobApplications, isLoading } =
    useGetFreelancerJobApplications(freelancerId);

  return (
    <Box>
      {isLoading && (
        <>
          <JobApplicationSkeleton />
          <JobApplicationSkeleton />
          <JobApplicationSkeleton />
          <JobApplicationSkeleton />
          <JobApplicationSkeleton />
        </>
      )}
      {jobApplications.map((j) => (
        <JobApplication key={j.id} jobApplication={j} />
      ))}
    </Box>
  );
};
