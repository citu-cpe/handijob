import { JobApplicationDTO } from 'generated-api';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useUpdateJobApplication = () => {
  const api = useContext(ApiContext);

  return useMutation((jobApplicationDTO: JobApplicationDTO) =>
    api.updateJobApplication(jobApplicationDTO)
  );
};
