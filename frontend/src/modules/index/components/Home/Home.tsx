import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Checkbox,
  CheckboxGroup,
  Wrap,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import React, { useEffect, useState } from 'react';
import { BottomRightButton } from '../../../../shared/components/button/BottomRightButton';
import {
  JobOpeningDTO,
  JobOpeningDTOCategoriesEnum,
  UserDTO,
} from 'generated-api';
import { useGetJobOpenings } from './hooks/useGetJobOpenings';
import { JobOpening } from './components/JobOpening/JobOpening';
import { JobOpeningForm } from './components/JobOpeningForm/JobOpeningForm';
import { JobOpeningSkeleton } from './components/JobOpeningSkeleton/JobOpeningSkeleton';
import { useGetCategories } from './components/JobOpeningForm/hooks/useGetCategories';

interface HomeProps {
  user: UserDTO;
}

export const Home = ({ user }: HomeProps) => {
  const { jobOpenings, isLoading } = useGetJobOpenings();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useGetCategories();
  const [filters, setFilters] = useState<JobOpeningDTOCategoriesEnum[]>([]);
  const [filteredJobOpenings, setFilteredJobOpenings] = useState<
    JobOpeningDTO[]
  >([]);

  useEffect(() => {
    setFilteredJobOpenings(getFilteredJobOpenings(jobOpenings, filters));
  }, [jobOpenings, filters]);

  const getFilteredJobOpenings = (
    originalJobOpenings: JobOpeningDTO[],
    newFilters: JobOpeningDTOCategoriesEnum[]
  ) => {
    if (newFilters.length === 0) { return originalJobOpenings; }

    return originalJobOpenings.filter((j) =>
      j.categories.some((c) => newFilters.includes(c))
    );
  };

  return (
    <Box>
      <Box rounded='md' shadow='md' bgColor='white' p='4' mb='4'>
        <Text mb='2' fontWeight='bold'>
          Fitler by category:
        </Text>
        <CheckboxGroup
          colorScheme='teal'
          onChange={(val: JobOpeningDTOCategoriesEnum[]) => setFilters(val)}
        >
          <Wrap spacing='4'>
            {categories.map((category) => (
              <Checkbox key={category.name} value={category.name}>
                {category.name}
              </Checkbox>
            ))}
          </Wrap>
        </CheckboxGroup>
      </Box>
      {isLoading && <JobOpeningSkeleton />}
      {filteredJobOpenings.map((jobOpening) => (
        <JobOpening key={jobOpening.id} jobOpening={jobOpening} />
      ))}

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size='2xl'
        scrollBehavior='inside'
      >
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
