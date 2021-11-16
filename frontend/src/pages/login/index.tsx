import { GetStaticProps } from 'next';
import { Login } from '../../modules/login/components/Login/Login';
import { NextPageWithLayout } from '../_app';

const LoginPage: NextPageWithLayout = () => <Login />;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      dontShowUser: true,
    },
  };
};

export default LoginPage;
