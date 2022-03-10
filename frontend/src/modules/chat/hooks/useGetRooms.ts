import { RoomDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useGetRooms = () => {
  const api = useContext(ApiContext);

  const query = useQuery('rooms', () => api.getRoomsOfUser());
  let rooms: RoomDTO[] | undefined;

  const { data } = query;

  if (data) {
    rooms = data.data;
  }

  return {
    ...query,
    rooms,
  };
};
