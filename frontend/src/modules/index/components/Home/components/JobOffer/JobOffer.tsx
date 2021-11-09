import { JobOfferDTO, UserDTO } from 'generated-api';
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
import { useDeleteJobOffer } from '../../hooks/useDeleteJobOffer';
import React, { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../../../shared/stores';
import { BsThreeDots } from 'react-icons/bs';

interface JobOfferProps {
  jobOffer: JobOfferDTO;
}

export const JobOffer = ({ jobOffer }: JobOfferProps) => {
  const mutation = useDeleteJobOffer();
  const [user, setUser] = useState<UserDTO | undefined>();
  const getUser = useGlobalStore((state) => state.getUser);
  const isOwner = user?.employerId && user.employerId === jobOffer.employerId;

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  return (
    <Box p='8' rounded='md' bg='gray.700' mb='4' w='100%'>
      <Flex justify='space-between'>
        <Heading color='gray.200'>{jobOffer.title}</Heading>
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
                <MenuItem color='red' onClick={() => mutation.mutate(jobOffer)}>
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
          {jobOffer.categories.map((category) => (
            <Tag key={category} colorScheme='teal'>
              {category}
            </Tag>
          ))}
        </Wrap>
      </Box>

      <Text my='4' color='gray.200'>
        {jobOffer.description}
      </Text>

      {jobOffer.imageUrl && (
        <Img src={jobOffer.imageUrl} alt={jobOffer.title} w='100%' />
      )}
    </Box>
  );
};
