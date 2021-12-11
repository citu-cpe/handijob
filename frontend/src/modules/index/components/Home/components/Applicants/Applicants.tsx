import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Img,
  Text,
} from '@chakra-ui/react';
import { JobApplicationDTOStatusEnum } from 'generated-api';
import React from 'react';
import { useGetJobApplicationsByJobOpening } from '../../hooks/useGetJobApplicationsByJobOpening';
import { useUpdateJobApplication } from '../../hooks/useUpdateJobApplication';
import { ApplicantsSkeleton } from './ApplicantsSkeleton';
import Link from 'next/link';

interface ApplicantsProps {
  jobOpeningId: string;
}

export const Applicants = ({ jobOpeningId }: ApplicantsProps) => {
  const { jobApplications, isLoading: jobApplicationsIsLoading } =
    useGetJobApplicationsByJobOpening(jobOpeningId);
  const {
    mutate: updateJobApplication,
    isLoading: updateJobApplicationLoading,
  } = useUpdateJobApplication();

  return (
    <Flex flexDir='column' alignItems='center'>
      {jobApplicationsIsLoading && (
        <>
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
          <ApplicantsSkeleton />
        </>
      )}
      {jobApplications.map((j) => (
        <Box key={j.id} w='50%' bgColor='white' rounded='md' p='4' mb='4'>
          <Box>
            <Link href={`/profile/${j.freelancer?.user?.username}`}>
              <a>
                <Flex mb='4'>
                  <Box w='10' h='10' rounded='full' overflow='hidden' mr='4'>
                    <Img
                      src={
                        j.freelancer?.user?.imageUrl ||
                        'https://i0.wp.com/grocapitus.com/wp-content/uploads/placeholder-profile-male-500x500.png'
                      }
                      cursor='pointer'
                    />
                  </Box>
                  <Heading key={j.freelancer?.user?.username} size='lg'>
                    @{j.freelancer?.user?.username}
                  </Heading>
                </Flex>
              </a>
            </Link>
            <Box mb='4'>
              <Box mb='4'>
                <Heading fontWeight='bold' mb='2' size='lg'>
                  Bio
                </Heading>
                <Text>
                  {j.freelancer?.user?.bio &&
                  j.freelancer?.user?.bio.length > 0 ? (
                    j.freelancer?.user?.bio
                  ) : (
                    <Text fontStyle='italic'>None</Text>
                  )}
                </Text>
              </Box>

              <Box mb='4'>
                <Heading fontWeight='bold' mb='2' size='lg'>
                  Work Experience
                </Heading>

                {j.freelancer?.workExperiences &&
                j.freelancer?.workExperiences.length > 0 ? (
                  j.freelancer?.workExperiences.map((w) => (
                    <Box key={w.id}>
                      <Box mb='2'>
                        <Text fontWeight='bold'>Job Title:</Text>
                        <Text>{w.jobTitle}</Text>
                      </Box>
                      <Box mb='2'>
                        <Text fontWeight='bold'>Job Description:</Text>
                        <Text>{w.jobDescription}</Text>
                      </Box>
                      <Box mb='2'>
                        <Text fontWeight='bold'>Years of Experience:</Text>
                        <Text>{w.yearsOfExperience}</Text>
                      </Box>
                      <Divider mb='2' />
                    </Box>
                  ))
                ) : (
                  <Text fontStyle='italic'>None</Text>
                )}
              </Box>
            </Box>
            <Flex justifyContent='flex-end'>
              <Button
                mr='4'
                colorScheme='red'
                isDisabled={
                  updateJobApplicationLoading ||
                  j.status === JobApplicationDTOStatusEnum.Rejected
                }
                onClick={() => {
                  j.status = JobApplicationDTOStatusEnum.Rejected;
                  updateJobApplication(j);
                }}
              >
                {j.status === JobApplicationDTOStatusEnum.Rejected
                  ? 'Rejected'
                  : 'Reject'}
              </Button>
              <Button
                colorScheme='green'
                isDisabled={
                  updateJobApplicationLoading ||
                  j.status === JobApplicationDTOStatusEnum.Accepted
                }
                onClick={() => {
                  j.status = JobApplicationDTOStatusEnum.Accepted;
                  updateJobApplication(j);
                }}
              >
                {j.status === JobApplicationDTOStatusEnum.Accepted
                  ? 'Accepted'
                  : 'Accept'}
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Flex>
  );
};
