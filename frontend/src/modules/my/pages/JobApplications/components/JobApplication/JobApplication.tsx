import {
  Box,
  Badge,
  ThemeTypings,
  Heading,
  Img,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tooltip,
} from '@chakra-ui/react';
import { JobApplicationDTO, JobApplicationDTOStatusEnum } from 'generated-api';
import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteJobApplication } from '../../../../../index/components/Home/hooks/useDeleteJobApplication';

interface JobApplicationProps {
  jobApplication: JobApplicationDTO;
}

const getColorScheme = (
  status: JobApplicationDTOStatusEnum | undefined
): ThemeTypings['colorSchemes'] | (string & {}) | undefined => {
  switch (status) {
    case JobApplicationDTOStatusEnum.UnderReview:
      return 'yellow';
    case JobApplicationDTOStatusEnum.Accepted:
      return 'green';
    case JobApplicationDTOStatusEnum.Rejected:
      return 'red';
    default:
      return undefined;
  }
};

export const JobApplication = ({ jobApplication }: JobApplicationProps) => {
  const { jobOpening, id, freelancer } = jobApplication;
  const { imageUrl, title } = jobOpening!;
  const {
    mutate: deleteJobApplication,
    isLoading: deleteJobApplicationIsLoading,
  } = useDeleteJobApplication();

  return (
    <Flex
      w='100%'
      alignItems='center'
      justifyContent='space-between'
      bgColor='white'
      rounded='md'
      shadow='md'
      pr='8'
      pl={!imageUrl ? '8' : undefined}
      minH='20'
      mb='4'
    >
      {imageUrl && (
        <Box flexBasis='20%' p='4'>
          <Img src={imageUrl} alt={title} w='100%' />
        </Box>
      )}

      <Box flexBasis='50%' overflow='hidden' textOverflow='ellipsis'>
        <Tooltip label={title.length > 40 && title}>
          <Heading size='md'>
            {title.slice(0, 40)}
            {title.length > 40 && '...'}
          </Heading>
        </Tooltip>
      </Box>

      <Badge colorScheme={getColorScheme(jobApplication.status)}>
        {jobApplication.status}
      </Badge>

      <Box alignSelf='center'>
        <Menu>
          <MenuButton>
            {deleteJobApplicationIsLoading ? (
              <Spinner color='red' />
            ) : (
              <Icon color='gray.700' as={BsThreeDots} cursor='pointer' />
            )}
          </MenuButton>
          <MenuList>
            <MenuItem
              color='red'
              onClick={() => {
                deleteJobApplication({
                  jobApplicationId: id!,
                  freelancerDTO: freelancer!,
                });
              }}
            >
              Withdraw Application
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};
