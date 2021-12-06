import { createContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import io, { Socket } from 'socket.io-client';
import { WebSocketEvents } from '../enums/webSocketEvents';
import { useGlobalStore } from '../stores';
import { socketURL } from './ApiProvider';

export const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [socket, setSocket] = useState<Socket | undefined>();
  const user = useGlobalStore((state) => state.user);
  const queryClient = useQueryClient();

  useEffect(() => {
    const newSocket = io(socketURL, {
      transportOptions: {
        polling: { extraHeaders: { userId: user?.id } },
      },
    });

    setSocket(newSocket);

    newSocket.on(WebSocketEvents.NOTIFICATIONS, () => {
      queryClient.invalidateQueries('notifications');
    });

    newSocket.on(WebSocketEvents.PRIVATE_MESSAGE, () => {
      queryClient.invalidateQueries('rooms');
    });

    return () => {
      newSocket.close();
    };
  }, [setSocket, user, queryClient]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
