import { EditEmployerDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useEditEmployer = (username: string) => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (editEmployerDTO: EditEmployerDTO) => api.editEmployer(editEmployerDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile', username]);
      },
    }
  );
};
