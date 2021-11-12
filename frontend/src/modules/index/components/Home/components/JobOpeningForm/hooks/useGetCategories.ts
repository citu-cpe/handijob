import { CategoryDTO } from 'generated-api';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { ApiContext } from '../../../../../../../shared/providers/ApiProvider';

export const useGetCategories = () => {
  const api = useContext(ApiContext);

  const query = useQuery('categories', () => api.getAllCategories());
  const { data } = query;
  let categories: CategoryDTO[] = [];

  if (data) {
    categories = data.data;
  }

  return {
    ...query,
    categories,
  };
};
