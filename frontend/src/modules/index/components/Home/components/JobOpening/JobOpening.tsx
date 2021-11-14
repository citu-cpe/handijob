import { JobOpeningDTO, UserDTO } from 'generated-api';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tag,
  Text,
  Wrap,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../../../shared/stores';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteJobOpening } from '../../hooks/useDeleteJobOpening';
import { useApplyForJobOpening } from '../../hooks/useApplyForJobOpening';
import { useDeleteJobApplication } from '../../hooks/useDeleteJobApplication';

interface JobOpeningProps {
  jobOpening: JobOpeningDTO;
}

export const JobOpening = ({ jobOpening }: JobOpeningProps) => {
  const { mutate: deleteJobOpening, isLoading: deleteJobOpeningIsLoading } =
    useDeleteJobOpening();
  const {
    mutate: createJobApplication,
    isLoading: createJobApplicationIsLoading,
  } = useApplyForJobOpening();
  const {
    mutate: deleteJobApplication,
    isLoading: deleteJobApplicationIsLoading,
  } = useDeleteJobApplication();
  const [user, setUser] = useState<UserDTO | undefined>();
  const getUser = useGlobalStore((state) => state.getUser);
  const isOwner = user?.employerId && user.employerId === jobOpening.employerId;
  const isFreelancer = !!user?.freelancerId;
  const jobApplication = jobOpening.jobApplications.find(
    (j) => j.freelancer?.id === user?.freelancerId!
  );
  const hasApplied = isFreelancer && !!jobApplication;

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  return (
    <Box p='8' rounded='md' bg='gray.700' mb='4' w='100%'>
      <Flex justify='space-between'>
        <Heading color='gray.200'>{jobOpening.title}</Heading>
        {isOwner && (
          <Box alignSelf='start'>
            <Menu>
              <MenuButton>
                {deleteJobOpeningIsLoading ? (
                  <Spinner color='red' />
                ) : (
                  <Icon color='gray.200' as={BsThreeDots} cursor='pointer' />
                )}
              </MenuButton>
              <MenuList>
                <MenuItem
                  color='red'
                  onClick={() => deleteJobOpening(jobOpening)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Flex>

      <Divider mt='4'></Divider>

      <Box my='4'>
        <Wrap>
          {jobOpening.categories.map((category) => (
            <Tag key={category} colorScheme='teal'>
              {category}
            </Tag>
          ))}
        </Wrap>
      </Box>

      <Box my='4' color='gray.200'>
        {jobOpening.description.split('\n').map((line, i) => (
          <Text key={line + i}>{line}</Text>
        ))}
      </Box>

      {jobOpening.imageUrl && (
        <Img src={jobOpening.imageUrl} alt={jobOpening.title} w='100%' />
      )}

      {hasApplied ? (
        <Button
          onClick={() =>
            deleteJobApplication({
              jobApplicationId: jobApplication.id!,
              freelancerDTO: { id: user.freelancerId! },
            })
          }
          isFullWidth
          mt='4'
          isLoading={deleteJobApplicationIsLoading}
          colorScheme='teal'
          variant='outline'
        >
          Withdraw Application
        </Button>
      ) : (
        <Button
          onClick={() =>
            createJobApplication({
              freelancerId: user?.freelancerId!,
              jobOpeningId: jobOpening.id,
            })
          }
          isFullWidth
          mt='4'
          isLoading={createJobApplicationIsLoading}
          colorScheme='teal'
        >
          Apply for this job
        </Button>
      )}
    </Box>
  );
};
