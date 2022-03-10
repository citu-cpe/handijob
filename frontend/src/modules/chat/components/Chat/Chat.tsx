import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useGetRooms } from '../../hooks/useGetRooms';
import { Rooms } from '../Rooms/Rooms';

// TODO; height styling
// TODO: text overflow hidden
// TODO: add is typing...
// TODO: don't await send message
export const Chat = () => {
  const { rooms, isLoading: roomsIsLoading } = useGetRooms();

  return (
    <Box>
      {roomsIsLoading ? (
        <Spinner color='teal' />
      ) : (
        rooms && <Rooms rooms={rooms} />
      )}
    </Box>
  );
};
