import { Flex } from '@chakra-ui/react';
import React from 'react';
import { RegisterForm } from '../RegisterForm/RegisterForm';

export const Register = () => {
  return (
    <Flex justifyContent='center'>
      <RegisterForm />
    </Flex>
  );
};
