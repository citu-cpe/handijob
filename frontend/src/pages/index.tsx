import { useGlobalStore } from '../shared/stores';
import { Landing } from '../modules/index/components/Landing/Landing';
import { Home } from '../modules/index/components/Home/Home';
import type { NextPageWithLayout } from './_app';

const Index: NextPageWithLayout = () => {
  const user = useGlobalStore((state) => state.user);

  return user ? <Home user={user} /> : <Landing />;
};

export default Index;
