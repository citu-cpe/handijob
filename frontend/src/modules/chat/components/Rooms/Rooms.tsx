import { Box, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { RoomDTO, SendMessageDTO, UserDTO } from 'generated-api';
import React, { useContext, useEffect, useState } from 'react';
import { ChatBox } from '../Chatbox/Chatbox';
import { useGetUsers } from '../../hooks/useGetUsers';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { SocketContext } from '../../../../shared/providers/SocketProvider';
import { WebSocketEvents } from '../../../../shared/enums/webSocketEvents';
import { useQueryClient } from 'react-query';

interface RoomsProps {
  rooms: RoomDTO[];
}

export const Rooms = ({ rooms }: RoomsProps) => {
  const [selectedRoom, setSelectedRoom] = useState<RoomDTO | undefined>(
    undefined
  );
  const [search, setSearch] = useState('');
  const { users } = useGetUsers();
  const [showRooms, setShowRooms] = useState(true);
  const socket = useContext(SocketContext);
  const queryClient = useQueryClient();
  const [filteredUsers, setFilteredUsers] = useState<UserDTO[]>([]);

  const resetUsers = () => {
    setFilteredUsers(users);
    setSearch('');
  };

  const isSelectedRoom = (room: RoomDTO) => {
    if (!selectedRoom) {
      return false;
    }

    return selectedRoom.id === room.id;
  };

  const selectRoom = (room: RoomDTO) => {
    if (selectedRoom) {
      markMessageAsSeen(selectedRoom);
    }

    markMessageAsSeen(room);
    setSelectedRoom(room);
  };

  const markMessageAsSeen = (room: RoomDTO) => {
    const unreadMessageIds = room.messages
      .filter((m) => !m.self && !m.seen)
      .map((m) => m.id);

    if (unreadMessageIds.length > 0) {
      socket?.emit(WebSocketEvents.MESSAGES_SEEN, unreadMessageIds);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      setSelectedRoom(rooms.find((r) => r.id === selectedRoom.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms, queryClient]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    socket?.on(WebSocketEvents.JOIN_ROOM, (room: RoomDTO) => {
      queryClient.invalidateQueries('rooms');
      setSelectedRoom(room);
      setShowRooms(true);
    });

    socket?.on(WebSocketEvents.MESSAGES_SEEN, () => {
      queryClient.invalidateQueries('rooms');
    });

    socket?.on(
      WebSocketEvents.PRIVATE_MESSAGE,
      (sendMessageDTO: SendMessageDTO) => {
        if (selectedRoom && selectedRoom.id === sendMessageDTO.roomId) {
          markMessageAsSeen(selectedRoom);
        }
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markMessageAsSeen, queryClient, socket]);

  return (
    <Box>
      <Flex>
        <Box flexBasis='30%' w='30%'>
          <Flex mb='4'>
            {!showRooms && (
              <IconButton
                colorScheme='teal'
                variant='ghost'
                icon={<ArrowBackIcon />}
                aria-label='back'
                mr='2'
                onClick={() => {
                  setShowRooms(true);
                  resetUsers();
                }}
              />
            )}
            <Input
              value={search}
              onChange={(e) => {
                const searchString = e.target.value;
                const newFilteredUsers = users.filter((u) =>
                  u.username.includes(searchString)
                );

                setSearch(searchString);
                setFilteredUsers(newFilteredUsers);
              }}
              placeholder='Search for users'
              bgColor='gray.200'
              onFocus={() => {
                setShowRooms(false);
              }}
            />
          </Flex>
          <Box>
            {showRooms
              ? rooms.map((room) => (
                  <Box
                    key={room.id}
                    onClick={() => selectRoom(room)}
                    bgColor={
                      room.id === selectedRoom?.id ? 'teal.100' : undefined
                    }
                    _hover={{
                      backgroundColor: 'teal.50',
                    }}
                    transition='all .2s ease-out'
                    cursor='pointer'
                    py='2'
                    px='4'
                    rounded='md'
                  >
                    <Flex justifyContent='space-between' alignItems='center'>
                      <Box
                        whiteSpace='nowrap'
                        overflow='hidden'
                        flexBasis='90%'
                      >
                        <Text fontWeight='bold'>{room.name}</Text>
                        {room.messages.length > 0 && (
                          <Box>
                            <Text>
                              {room.messages[room.messages.length - 1].content}
                            </Text>
                          </Box>
                        )}
                      </Box>
                      {room.hasUnseenMessages && !isSelectedRoom(room) && (
                        <Box w='2' h='2' bgColor='teal' rounded='full'></Box>
                      )}
                    </Flex>
                  </Box>
                ))
              : filteredUsers.map((u) => (
                  <Box
                    key={u.id}
                    _hover={{
                      backgroundColor: 'teal.50',
                    }}
                    transition='all .2s ease-out'
                    cursor='pointer'
                    p='2'
                    rounded='md'
                    onClick={() => {
                      let existingRoom: RoomDTO | undefined;

                      for (const room of rooms) {
                        const participantIds = room.participants.map(
                          (p) => p.id
                        );

                        if (participantIds.includes(u.id)) {
                          existingRoom = room;
                          break;
                        }
                      }

                      if (existingRoom) {
                        setSelectedRoom(existingRoom);
                        setShowRooms(true);
                      } else {
                        socket?.emit(WebSocketEvents.JOIN_ROOM, u.id);
                      }

                      resetUsers();
                    }}
                  >
                    <Text fontWeight='bold'>{u.username}</Text>
                  </Box>
                ))}
          </Box>
        </Box>

        <Box flexBasis='70%'>
          <ChatBox room={selectedRoom} />
        </Box>
      </Flex>
    </Box>
  );
};
