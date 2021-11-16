import { Flex } from '@chakra-ui/react';
import React from 'react';
import { LoginForm } from '../LoginForm/LoginForm';

export const Login = () => {
  return (
    <Flex justifyContent='center'>
      <LoginForm />
    </Flex>
  );
};
