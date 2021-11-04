import { Box, Heading, Image, Text } from '@chakra-ui/react';
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
      <Image
        src={teamMember.imageUrl}
        alt='Princh Canal'
        borderTopRadius={borderRadius}
      />
      <Box p='5'>
        <Heading size='md'>{teamMember.name}</Heading>
        <Text fontStyle='italic'>{teamMember.role}</Text>
      </Box>
    </Box>
  );
};
