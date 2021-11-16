import { GetStaticProps } from 'next';
import { Register } from '../../modules/register/components/Register/Register';
import { NextPageWithLayout } from '../_app';

const RegisterPage: NextPageWithLayout = () => <Register />;

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      dontShowUser: true,
    },
  };
};

export default RegisterPage;
