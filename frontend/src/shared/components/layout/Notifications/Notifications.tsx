import { Box, Divider, Spinner, Text } from '@chakra-ui/react';
import { NotificationDTO } from 'generated-api';
import React from 'react';
import { useMarkNotificationAsRead } from '../../../hooks/useMarkNotificationAsRead';

export interface NotificationsProps {
  notifications: NotificationDTO[];
  isLoading: boolean;
}

export const Notifications = ({
  notifications,
  isLoading,
}: NotificationsProps) => {
  const { mutate: markNotifcationAsRead } = useMarkNotificationAsRead();
  const overflowLength = 70;

  return isLoading ? (
    <Spinner color='teal' />
  ) : notifications.length === 0 ? (
    <Text textAlign='center' p='2'>
      No notifications
    </Text>
  ) : (
    <Box maxH='64' overflowY='scroll'>
      {notifications.map((n) => (
        <>
          <Box
            key={n.id}
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
            <Text textAlign='right' color='gray.500' fontSize='sm'>
              {n.timeAgo}
            </Text>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};
