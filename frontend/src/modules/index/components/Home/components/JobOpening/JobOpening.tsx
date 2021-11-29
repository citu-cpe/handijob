import { JobOpeningDTO } from 'generated-api';
import {
  Badge,
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  Text,
  Tooltip,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react';
import React from 'react';
import { useGlobalStore } from '../../../../../../shared/stores';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteJobOpening } from '../../hooks/useDeleteJobOpening';
import { useApplyForJobOpening } from '../../hooks/useApplyForJobOpening';
import { useDeleteJobApplication } from '../../hooks/useDeleteJobApplication';
import { Applicants } from '../Applicants/Applicants';
import { useArchiveJobOpening } from '../../hooks/useArchiveJobOpening';

interface JobOpeningProps {
  jobOpening: JobOpeningDTO;
}

export const JobOpening = ({ jobOpening }: JobOpeningProps) => {
  const { mutate: deleteJobOpening, isLoading: deleteJobOpeningIsLoading } =
    useDeleteJobOpening();
  const { mutate: archiveJobOpening, isLoading: archiveJobOpeningIsLoading } =
    useArchiveJobOpening();
  const {
    mutate: createJobApplication,
    isLoading: createJobApplicationIsLoading,
  } = useApplyForJobOpening();
  const {
    mutate: deleteJobApplication,
    isLoading: deleteJobApplicationIsLoading,
  } = useDeleteJobApplication();
  const user = useGlobalStore((state) => state.user);
  const isOwner = user?.employerId && user.employerId === jobOpening.employerId;
  const isFreelancer = !!user?.freelancerId;
  const jobApplication = jobOpening.jobApplications.find(
    (j) => j.freelancer?.id === user?.freelancerId!
  );
  const hasApplied = !!jobApplication;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const overflowLength = 50;

  return (
    <>
      <Box p='8' rounded='md' bg='white' mb='4' w='100%' shadow='md'>
        <Flex justify='space-between'>
          <Tooltip
            label={jobOpening.title.length > overflowLength && jobOpening.title}
          >
            <Box>
              <Heading
                color='gray.700'
                size='lg'
                onClick={isOwner ? onOpen : undefined}
                cursor={isOwner ? 'pointer' : 'default'}
              >
                {jobOpening.title.slice(0, overflowLength)}
                {jobOpening.title.length > overflowLength && '...'}
              </Heading>
              {jobOpening.archived && <Badge mt='2'>Archived</Badge>}
            </Box>
          </Tooltip>
          {isOwner && (
            <Box alignSelf='start'>
              <Menu>
                <MenuButton>
                  {deleteJobOpeningIsLoading || archiveJobOpeningIsLoading ? (
                    <Spinner color='red' />
                  ) : (
                    <Icon color='gray.700' as={BsThreeDots} cursor='pointer' />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => archiveJobOpening(jobOpening)}>
                    {jobOpening.archived ? 'Unarchive' : 'Archive'}
                  </MenuItem>
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

        <Divider mt='4' />

        <Box my='4'>
          <Wrap>
            {jobOpening.categories.map((category) => (
              <Tag key={category} colorScheme='teal'>
                {category}
              </Tag>
            ))}
          </Wrap>
        </Box>

        <Box my='4' color='gray.700'>
          {jobOpening.description.split('\n').map((line, i) => (
            <Text key={line + i}>{line}</Text>
          ))}
        </Box>

        {jobOpening.imageUrl && (
          <Img src={jobOpening.imageUrl} alt={jobOpening.title} w='100%' />
        )}

        {isFreelancer && hasApplied && !isOwner && (
          <Button
            onClick={() =>
              deleteJobApplication({
                jobApplicationId: jobApplication?.id!,
                freelancerDTO: { id: user?.freelancerId! },
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
        )}

        {isFreelancer && !hasApplied && !isOwner && (
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
      {isOwner && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Applicants</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Applicants jobOpeningId={jobOpening.id} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
