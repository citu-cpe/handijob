import { Box, Container, Heading, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { TeamMember } from './TeamMember/TeamMember';
import { teamMembers } from './teamMembers';

export const Team = () => {
  return (
    <Box w='100%'>
      <Container maxW='container.xl' centerContent>
        <Heading
          textAlign='center'
          my='10'
          textTransform='uppercase'
          color='teal.500'
        >
          Meet the Team
        </Heading>
        <Wrap spacing='8' justify={['center', 'center', 'center']}>
          {teamMembers.map((t) => (
            <WrapItem key={t.name}>
              <TeamMember teamMember={t} />
            </WrapItem>
          ))}
        </Wrap>
      </Container>
    </Box>
  );
};
