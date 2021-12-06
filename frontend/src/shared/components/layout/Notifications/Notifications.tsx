import { BellIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useGetNotifications } from '../../../hooks/useGetNotifications';
import { useMarkNotificationAsRead } from '../../../hooks/useMarkNotificationAsRead';

export const Notifications = () => {
  const { mutate: markNotifcationAsRead } = useMarkNotificationAsRead();
  const { notificationsDTO, isLoading } = useGetNotifications();
  const overflowLength = 70;

  return (
    <Popover>
      <PopoverTrigger>
        <Box pos='relative' display='inline'>
          <IconButton
            colorScheme='teal'
            icon={<BellIcon />}
            aria-label='notifications'
            variant='ghost'
            size='lg'
            mr='4'
          />
          {notificationsDTO && notificationsDTO.numUnread > 0 && (
            <Flex
              justifyContent='center'
              alignItems='center'
              display='inline-flex'
              pos='absolute'
              top='-12px'
              right='15px'
              bgColor='red'
              color='white'
              rounded='full'
              h='5'
              w='5'
              textAlign='center'
              p='2'
              cursor='pointer'
              fontSize='xs'
            >
              <Text>{notificationsDTO?.numUnread}</Text>
            </Flex>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader color='teal' fontWeight='bold'>
          Notifications
        </PopoverHeader>
        <PopoverBody p='0'>
          {isLoading ? (
            <Spinner color='teal' />
          ) : notificationsDTO?.notifications.length === 0 ? (
            <Text textAlign='center' p='4'>
              No notifications
            </Text>
          ) : (
            <Box maxH='64' overflowY='scroll'>
              {notificationsDTO?.notifications.map((n) => (
                <Box key={n.id}>
                  <Box
                    p='2'
                    bgColor={n.seen ? 'white' : 'teal.50'}
                    cursor='pointer'
                    _hover={{
                      backgroundColor: 'teal.100',
                    }}
                    transition='all .2s ease-out'
                    onClick={() => markNotifcationAsRead(n)}
                  >
                    <Text fontWeight='bold'>
                      {n.content.slice(0, overflowLength)}
                      {n.content.length > overflowLength && '...'}
                    </Text>
                    {/*<Text textAlign='right' color='gray.500' fontSize='sm'>
                      {n.timeAgo}
                      </Text>*/}
                  </Box>
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
