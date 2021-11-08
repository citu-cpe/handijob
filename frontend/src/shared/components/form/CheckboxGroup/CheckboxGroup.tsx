import React from 'react';
import type { FieldProps } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  CheckboxGroup as ChakraCheckboxGroup,
  CheckboxGroupProps as ChakraCheckboxGroupProps,
} from '@chakra-ui/react';

interface CheckboxGroupProps {
  fieldProps: FieldProps;
  label?: string;
  name?: string;
  id?: string;
  isRequired?: boolean;
}

export const CheckboxGroup = ({
  fieldProps: { field, form },
  label,
  isRequired,
  ...props
}: CheckboxGroupProps & ChakraCheckboxGroupProps) => (
  <FormControl
    isInvalid={!!form.errors[props.name!] && !!form.touched[props.name!]}
    isRequired={isRequired}
    mb='4'
  >
    {!!label && (
      <FormLabel
        htmlFor={props.id}
        mb='2'
        color='gray.800'
        fontWeight='semibold'
      >
        {label}
      </FormLabel>
    )}
    <ChakraCheckboxGroup {...field} {...props} />
    <FormErrorMessage>{form.errors[props.name!]}</FormErrorMessage>
  </FormControl>
);
