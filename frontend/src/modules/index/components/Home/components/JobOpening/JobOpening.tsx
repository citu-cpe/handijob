import { JobOpeningDTO, UserDTO } from 'generated-api';
import {
  Box,
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

interface JobOpeningProps {
  jobOpening: JobOpeningDTO;
}

export const JobOpening = ({ jobOpening }: JobOpeningProps) => {
  const mutation = useDeleteJobOpening();
  const [user, setUser] = useState<UserDTO | undefined>();
  const getUser = useGlobalStore((state) => state.getUser);
  const isOwner = user?.employerId && user.employerId === jobOpening.employerId;

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
                {mutation.isLoading ? (
                  <Spinner color='red' />
                ) : (
                  <Icon color='gray.200' as={BsThreeDots} cursor='pointer' />
                )}
              </MenuButton>
              <MenuList>
                <MenuItem
                  color='red'
                  onClick={() => mutation.mutate(jobOpening)}
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
    </Box>
  );
};
