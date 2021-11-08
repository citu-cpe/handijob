import { JobOfferDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../shared/providers/ApiProvider';

export const useGetJobOffers = () => {
  const api = useContext(ApiContext);

  const query = useQuery('jobOffers', () => api.getAllJobOffers());
  const { data } = query;
  let jobOffers: JobOfferDTO[] = [];

  if (data) {
    jobOffers = data.data;
  }

  return {
    ...query,
    jobOffers,
  };
};
