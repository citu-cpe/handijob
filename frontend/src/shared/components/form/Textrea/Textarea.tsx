import React from 'react';
import type { FieldProps } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
} from '@chakra-ui/react';

interface TextareaProps {
  fieldProps: FieldProps;
  label?: string;
  isRequired?: boolean;
}

export const Textarea = ({
  fieldProps: { field, form },
  label,
  isRequired,
  ...props
}: TextareaProps & ChakraTextareaProps) => (
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
    <ChakraTextarea {...field} {...props} />
    <FormErrorMessage>{form.errors[props.name!]}</FormErrorMessage>
  </FormControl>
);
