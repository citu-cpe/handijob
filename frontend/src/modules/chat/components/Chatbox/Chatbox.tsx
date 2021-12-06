import { Box, Flex, Heading, IconButton, Textarea } from '@chakra-ui/react';
import { RoomDTO, SendMessageDTO } from 'generated-api';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { WebSocketEvents } from '../../../../shared/enums/webSocketEvents';
import { SocketContext } from '../../../../shared/providers/SocketProvider';

interface ChatBoxProps {
  room: RoomDTO | undefined;
}

export const ChatBox = ({ room }: ChatBoxProps) => {
  const [content, setContent] = useState<string>('');
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(e.target.value);
  const socket = useContext(SocketContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (content.replaceAll('\n', '').length === 0) {
      return;
    }

    const message: SendMessageDTO = {
      content,
      roomId: room!.id,
    };

    socket?.emit(WebSocketEvents.PRIVATE_MESSAGE, message);

    setContent('');
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [room]);

  return (
    <Box rounded='md'>
      {room ? (
        <Box ml='4' bg='white'>
          <Box p='4' shadow='sm' rounded='md'>
            <Heading size='md'>{room.name}</Heading>
          </Box>
          <Box px='4' h='70vh' overflowY='scroll' ref={chatBoxRef}>
            <Flex flexDir='column'>
              {room.messages.map((m) => (
                <Box
                  as='span'
                  key={m.id}
                  bgColor={m.self ? 'teal' : 'gray.100'}
                  color={m.self ? 'white' : 'black'}
                  maxW='60%'
                  ml={m.self ? 'auto' : undefined}
                  mr={!m.self ? 'auto' : undefined}
                  rounded='md'
                  p='2'
                  my='2'
                >
                  {m.content}
                </Box>
              ))}
            </Flex>
          </Box>
          <Flex alignItems='center' justifyContent='space-between' p='2'>
            <Textarea
              w='full'
              bg='gray.100'
              onChange={handleContentChange}
              onKeyDown={(e) => {
                const keyCode = e.which || e.keyCode;
                // 13 represents the Enter key
                if (keyCode === 13 && !e.shiftKey) {
                  // Don't generate a new line
                  e.preventDefault();

                  sendMessage();
                }
              }}
              value={content}
              resize='none'
              rows={1}
            />

            <IconButton
              colorScheme='teal'
              icon={<IoMdSend />}
              aria-label='send message'
              variant='ghost'
              size='lg'
              ml='2'
              onClick={() => sendMessage()}
            />
          </Flex>
        </Box>
      ) : (
        <Box ml='4'>
          <Heading>Select a room</Heading>
        </Box>
      )}
    </Box>
  );
};
