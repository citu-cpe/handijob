import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { BottomRightButton } from '../../../../shared/components/button/BottomRightButton';
import { UserDTO } from 'generated-api';
import { useGetJobOpenings } from './hooks/useGetJobOpenings';
import { JobOpening } from './components/JobOpening/JobOpening';
import { JobOpeningForm } from './components/JobOpeningForm/JobOpeningForm';

interface HomeProps {
  user: UserDTO;
}

export const Home = ({ user }: HomeProps) => {
  const { jobOpenings } = useGetJobOpenings();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      {jobOpenings.map((jobOpening) => (
        <JobOpening key={jobOpening.id} jobOpening={jobOpening} />
      ))}

      <Modal onClose={onClose} isOpen={isOpen} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Job Opening</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JobOpeningForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {user.employerId && (
        <BottomRightButton
          colorScheme='teal'
          onClick={() => {
            onOpen();
          }}
          rounded='full'
          w='20'
          h='20'
        >
          <AddIcon />
        </BottomRightButton>
      )}
    </Box>
  );
};
