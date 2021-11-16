import { MyJobOpenings } from '../../../modules/my/pages/JobOpenings/components/MyJobOpenings/MyJobOpenings';
import { useGlobalStore } from '../../../shared/stores';
import { NextPageWithLayout } from '../../_app';

const MyJobOpeningsPage: NextPageWithLayout = () => {
  const user = useGlobalStore((state) => state.user);

  return user ? <MyJobOpenings employerId={user.employerId!} /> : <></>;
};

export default MyJobOpeningsPage;
