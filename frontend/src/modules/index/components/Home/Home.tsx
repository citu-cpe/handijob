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
import { useGetJobOffers } from './hooks/useGetJobOffers';
import { JobOffer } from './components/JobOffer/JobOffer';
import { JobOfferForm } from './components/JobOfferForm.tsx/JobOfferForm';
import { useGlobalStore } from '../../../../shared/stores';
import { UserDTO } from 'generated-api';

interface HomeProps {
  user: UserDTO;
}

export const Home = ({ user }: HomeProps) => {
  const { jobOffers } = useGetJobOffers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navbarHeight = useGlobalStore((state) => state.navbarHeight);

  return (
    <Box flexDir='column' maxW='container.xl' m='auto' mt={navbarHeight}>
      {jobOffers.map((jobOffer) => (
        <JobOffer key={jobOffer.id} jobOffer={jobOffer} />
      ))}

      <Modal onClose={onClose} isOpen={isOpen} size='2xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Job Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <JobOfferForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {user.employerId && (
        <BottomRightButton
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
