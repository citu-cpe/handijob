import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Text,
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Img,
  Spinner,
  Divider,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Input,
  Center,
  IconButton,
} from '@chakra-ui/react';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAxios } from '../../../../shared/hooks/useAxios';
import { useGlobalStore } from '../../../../shared/stores';
import { useEditEmployer } from '../../hooks/useEditEmployer';
import { useEditUser } from '../../hooks/useEditUser';
import { useGetProfile } from '../../hooks/useGetProfile';
import { WorkExperienceForm } from '../WorkExperienceForm/WorkExperienceForm';

interface ProfileProps {
  username: string;
}

export const Profile = ({ username }: ProfileProps) => {
  const { profile, isLoading: profileIsLoading } = useGetProfile(username);
  const [bio, setBio] = useState<string | undefined>();
  const [companyName, setCompanyName] = useState<string | undefined>();
  const [companyDescription, setCompanyDescription] = useState<
    string | undefined
  >();
  const { mutate: editUser, isLoading: editIsLoading } = useEditUser(username);
  const { mutate: editEmployer, isLoading: editEmployerIsLoading } =
    useEditEmployer(username);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const user = useGlobalStore((state) => state.user);
  const [isSelf, setIsSelf] = useState(false);

  useEffect(() => {
    setBio(profile?.bio);
    setCompanyName(profile?.employer?.companyName);
    setCompanyDescription(profile?.employer?.companyDescription);
    setIsSelf(user?.id === profile?.id);
  }, [profile, user]);

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();

      formData.append('image', image);
      setProfilePictureLoading(true);
      await axios.put('/user/profile-picture', formData);
      queryClient.invalidateQueries(['profile', username]);
      setProfilePictureLoading(false);
    }
  };

  const deleteProfilePicture = async () => {
    setProfilePictureLoading(true);
    await axios.delete('/user/profile-picture');
    queryClient.invalidateQueries(['profile', username]);
    setProfilePictureLoading(false);
  };

  return profileIsLoading ? (
    <Spinner color='teal' />
  ) : (
    <Box>
      <Flex alignItems='center' flexDir='column' mb='4'>
        <Box pos='relative'>
          {profile?.imageUrl && isSelf && (
            <IconButton
              icon={<CloseIcon />}
              aria-label='delete profile picture'
              pos='absolute'
              top='0'
              right='-7'
              onClick={() => deleteProfilePicture()}
            />
          )}
          <Box
            mb='4'
            w='52'
            h='52'
            rounded='full'
            border='5px solid'
            borderColor='teal'
            overflow='hidden'
            pos='relative'
          >
            <Img
              src={
                profile?.imageUrl ||
                'https://i0.wp.com/grocapitus.com/wp-content/uploads/placeholder-profile-male-500x500.png'
              }
              onClick={() => {
                if (isSelf) {
                  imageInputRef.current?.click();
                }
              }}
              cursor='pointer'
            />

            <Input
              name='image'
              type='file'
              accept='.jpg, .jpeg, .png'
              id='image'
              onChange={(e) => {
                handleOnChange(e);
              }}
              opacity='0'
              h='0'
              w='0'
              cursor='pointer'
              p='0'
              ref={imageInputRef}
            />

            {profilePictureLoading && (
              <Center
                w='full'
                h='full'
                pos='absolute'
                top='0'
                left='0'
                bg='gray'
                opacity='70%'
              >
                <Spinner color='teal' />
              </Center>
            )}
          </Box>
        </Box>
        <Heading>{username}</Heading>
      </Flex>
      <Box alignSelf='start' mb='4' bgColor='white' rounded='md' p='4'>
        <Heading size='md' mb='2'>
          About me
        </Heading>
        <Flex alignItems='center'>
          {isSelf ? (
            <Editable
              defaultValue={profile?.bio}
              w='full'
              placeholder={!profile?.bio ? 'Add a bio' : profile?.bio}
              isDisabled={editIsLoading}
              bgColor={editIsLoading ? 'gray.300' : undefined}
              color={editIsLoading ? 'gray.100' : undefined}
              transition='all .2s ease-out'
              mr='2'
            >
              <EditablePreview w='full' />
              <EditableInput
                w='full'
                border='1px solid'
                borderColor='gray.300'
                p='2'
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onKeyDown={(e) => {
                  const keyCode = e.which || e.keyCode;
                  // 13 represents the Enter key
                  if (keyCode === 13) {
                    editUser({ bio });
                  }
                }}
              />
            </Editable>
          ) : (
            <Text>{profile?.bio}</Text>
          )}
        </Flex>
      </Box>
      {profile?.employer && (
        <Box mb='4' bgColor='white' rounded='md' p='4'>
          <Heading size='md' mb='2'>
            Company Details
          </Heading>
          <Box mb='2'>
            <Text fontWeight='bold'>Company Name:</Text>
            {isSelf ? (
              <Editable
                defaultValue={profile?.employer.companyName}
                w='full'
                placeholder={
                  !profile?.employer.companyName
                    ? 'Add a company name'
                    : profile?.employer.companyName
                }
                isDisabled={editEmployerIsLoading}
                bgColor={editEmployerIsLoading ? 'gray.300' : undefined}
                color={editEmployerIsLoading ? 'gray.100' : undefined}
                transition='all .2s ease-out'
                mr='2'
              >
                <EditablePreview w='full' />
                <EditableInput
                  w='full'
                  border='1px solid'
                  borderColor='gray.300'
                  p='2'
                  value={bio}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onKeyDown={(e) => {
                    const keyCode = e.which || e.keyCode;
                    // 13 represents the Enter key
                    if (keyCode === 13) {
                      editEmployer({ companyName });
                    }
                  }}
                />
              </Editable>
            ) : (
              <Text>{profile?.employer.companyName}</Text>
            )}
          </Box>
          <Box mb='2'>
            <Text fontWeight='bold'>Company Description:</Text>
            {isSelf ? (
              <Editable
                defaultValue={profile?.employer.companyDescription}
                w='full'
                placeholder={
                  !profile?.employer?.companyDescription
                    ? 'Add a company description'
                    : profile?.employer.companyDescription
                }
                isDisabled={editIsLoading}
                bgColor={editEmployerIsLoading ? 'gray.300' : undefined}
                color={editEmployerIsLoading ? 'gray.100' : undefined}
                transition='all .2s ease-out'
                mr='2'
              >
                <EditablePreview w='full' />
                <EditableInput
                  w='full'
                  border='1px solid'
                  borderColor='gray.300'
                  p='2'
                  value={profile?.employer.companyDescription}
                  onChange={(e) => setCompanyDescription(e.target.value)}
                  onKeyDown={(e) => {
                    const keyCode = e.which || e.keyCode;
                    // 13 represents the Enter key
                    if (keyCode === 13) {
                      editEmployer({ companyDescription });
                    }
                  }}
                />
              </Editable>
            ) : (
              <Text>{profile.employer.companyDescription}</Text>
            )}
          </Box>
        </Box>
      )}
      {profile?.freelancer && (
        <Box bgColor='white' p='4' rounded='md'>
          <Heading size='md' mb='2'>
            Work Experience
          </Heading>
          {profile.freelancer.workExperiences.map((w) => (
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
          ))}

          {isSelf && (
            <Button w='full' my='2' onClick={() => onOpen()}>
              <AddIcon mr='2' />
              Add Work Experience
            </Button>
          )}

          <Modal
            onClose={onClose}
            isOpen={isOpen}
            size='2xl'
            scrollBehavior='inside'
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Work Experience</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <WorkExperienceForm username={username} onClose={onClose} />
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      )}
    </Box>
  );
};
