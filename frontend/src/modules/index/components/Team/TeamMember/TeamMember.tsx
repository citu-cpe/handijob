import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface TeamMemberProps {
  teamMember: TeamMember;
}

export const TeamMember = ({ teamMember }: TeamMemberProps) => {
  const borderRadius = 'md';

  return (
    <Box
      w={['22rem', '24rem', '22rem', '18rem', '24rem']}
      borderRadius={borderRadius}
      bgColor='gray.50'
      shadow='md'
    >
      <Box
        bgColor='gray.50'
        h='20rem'
        bgImg={`url("${teamMember.imageUrl}")`}
        bgRepeat='no-repeat'
        bgPos='center'
        bgSize='cover'
        borderTopRadius={borderRadius}
      ></Box>
      <Box p='5'>
        <Heading size='md' color='teal.500'>
          {teamMember.name}
        </Heading>
        <Text fontStyle='italic'>{teamMember.role}</Text>
      </Box>
    </Box>
  );
};
