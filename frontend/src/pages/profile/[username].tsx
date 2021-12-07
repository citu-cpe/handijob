import { useRouter } from 'next/router';
import React from 'react';
import { Profile } from '../../modules/profile/components/Profile/Profile';
import { NextPageWithLayout } from '../_app';

const ProfilePage: NextPageWithLayout = () => {
  const router = useRouter();
  const { username } = router.query;

  return <Profile username={username as string} />;
};

export default ProfilePage;
