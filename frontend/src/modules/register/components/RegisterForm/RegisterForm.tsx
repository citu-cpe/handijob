import { Input } from '../../../../shared/components/form/Input/Input';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { FieldProps, Field, Form, Formik } from 'formik';
import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Link,
  Select,
} from '@chakra-ui/react';
import { useRegister } from '../../hooks/useRegister';
import {
  RegisterUserDTO,
  RegisterUserDTOAccountTypesEnum,
} from 'generated-api';

export const RegisterForm = () => {
  const mutation = useRegister();

  const onSubmit = (registerDTO: RegisterUserDTO) => {
    mutation.mutate(registerDTO);
  };

  const initialValues = {
    email: '',
    username: '',
    password: '',
    accountTypes: [],
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    username: Yup.string().required('Required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Required'),
    accountTypes: Yup.array()
      .min(1, 'Choose at least one account type')
      .required(),
  });

  return (
    <Box bg='gray.200' p='8' borderRadius='md' w='xl'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form noValidate>
            <Box mb='4'>
              <Field name='username'>
                {(fieldProps: FieldProps<string, RegisterUserDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='username'
                    label='Username'
                    type='text'
                    id='username'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                  />
                )}
              </Field>
              <Field name='email' type='email'>
                {(fieldProps: FieldProps<string, RegisterUserDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='email'
                    label='Email'
                    type='email'
                    id='email'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                  />
                )}
              </Field>
              <Field name='password' type='password'>
                {(fieldProps: FieldProps<string, RegisterUserDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                  />
                )}
              </Field>
              <Field name='accountTypes'>
                {(fieldProps: FieldProps<string, RegisterUserDTO>) => (
                  <FormControl
                    isInvalid={
                      !!fieldProps.form.errors.accountTypes &&
                      !!fieldProps.form.touched.accountTypes
                    }
                    isRequired
                    mb='4'
                  >
                    <FormLabel
                      htmlFor='accountTypes'
                      color='gray.800'
                      fontWeight='semibold'
                    >
                      Become a(n):
                    </FormLabel>
                    <Select
                      id='accountTypes'
                      {...fieldProps.field}
                      onChange={(e) => {
                        fieldProps.form.setFieldValue(
                          'accountTypes',
                          [e.target.value],
                          true
                        );
                      }}
                      value={fieldProps.field.value[0]}
                    >
                      {Object.values(RegisterUserDTOAccountTypesEnum).map(
                        (val) => (
                          <option key={val} value={val}>
                            {val}
                          </option>
                        )
                      )}
                    </Select>
                    <FormErrorMessage>
                      {fieldProps.form.errors.accountTypes}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Box>
            <Box mb='4'>
              <Button
                data-cy='register-submit-btn'
                formNoValidate
                type='submit'
                isLoading={mutation.isLoading}
                isFullWidth
                bgColor='gray.800'
                color='gray.50'
                _hover={{ bgColor: 'gray.800', color: 'gray.50' }}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
      <Flex justifyContent='right' color='gray.500'>
        <NextLink href='/login' passHref>
          <Link>Log In</Link>
        </NextLink>
      </Flex>
    </Box>
  );
};
