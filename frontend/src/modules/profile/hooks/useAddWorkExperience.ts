import { CreateWorkExperienceDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ApiContext } from '../../../shared/providers/ApiProvider';

export const useAddWorkExperience = (
  username: string,
  onClose?: () => void
) => {
  const api = useContext(ApiContext);
  const queryClient = useQueryClient();

  return useMutation(
    (createWorkExperienceDTO: CreateWorkExperienceDTO) =>
      api.addWorkExperience(createWorkExperienceDTO),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profile', username]);

        if (onClose) {
          onClose();
        }
      },
    }
  );
};
