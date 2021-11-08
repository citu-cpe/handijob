import { JobOfferDTO, UserDTO } from 'generated-api';
import { Img } from '@chakra-ui/react';
import styles from './JobOffer.module.scss';
import { useDeleteJobOffer } from '../../hooks/useDeleteJobOffer';
import { useEffect, useState } from 'react';
import { useGlobalStore } from '../../../../../../shared/stores';

interface JobOfferProps {
  jobOffer: JobOfferDTO;
}

export const JobOffer = ({ jobOffer }: JobOfferProps) => {
  const mutation = useDeleteJobOffer();
  const [user, setUser] = useState<UserDTO | undefined>();
  const getUser = useGlobalStore((state) => state.getUser);

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  return (
    <div className={styles.JobOffer}>
      <p>{jobOffer.title}</p>
      <p>{jobOffer.description}</p>
      {jobOffer.imageUrl && (
        <Img src={jobOffer.imageUrl} alt={jobOffer.title} w='20rem' />
      )}
      <p>Categories:</p>
      {jobOffer.categories.map((category) => (
        <p key={category}>{category}</p>
      ))}
      {user?.employerId && user?.employerId === jobOffer.employerId && (
        <button
          onClick={() => mutation.mutate(jobOffer)}
          disabled={mutation.isLoading}
        >
          Delete
        </button>
      )}
    </div>
  );
};
