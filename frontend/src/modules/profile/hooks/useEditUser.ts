import { EditUserDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useEditUser = (username: string) => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation((editUserDTO: EditUserDTO) => api.editUser(editUserDTO), {
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', username]);
    },
  });
};
