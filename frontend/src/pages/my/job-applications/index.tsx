import React from 'react';
import { MyJobApplications } from '../../../modules/my/pages/JobApplications/components/MyJobApplications/MyJobApplications';
import { useGlobalStore } from '../../../shared/stores';
import type { NextPageWithLayout } from '../../_app';

const MyJobApplicationsPage: NextPageWithLayout = () => {
  const user = useGlobalStore((state) => state.user);

  return user ? <MyJobApplications freelancerId={user.freelancerId!} /> : <></>;
};

export default MyJobApplicationsPage;
