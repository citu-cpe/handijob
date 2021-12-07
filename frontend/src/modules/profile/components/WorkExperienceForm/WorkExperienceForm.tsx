import { Box, Button } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import { CreateWorkExperienceDTO } from 'generated-api';
import React from 'react';
import * as Yup from 'yup';
import { Input } from '../../../../shared/components/form/Input/Input';
import { useAddWorkExperience } from '../../hooks/useAddWorkExperience';

interface WorkExperienceFormProps {
  onClose?: () => void;
  username: string;
}

interface FormGroup {
  jobTitle: string;
  jobDescription: string;
  yearsOfExperience: string;
}

export const WorkExperienceForm = ({
  onClose,
  username,
}: WorkExperienceFormProps) => {
  const { mutate: addWorkExperience, isLoading } = useAddWorkExperience(
    username,
    onClose
  );

  const initialValues = {
    jobTitle: '',
    jobDescription: '',
    yearsOfExperience: '',
  };

  const validationSchema = Yup.object({
    jobTitle: Yup.string().required('Required'),
    jobDescription: Yup.string().required('Required'),
    yearsOfExperience: Yup.string().required('Required'),
  });

  const onSubmit = (values: FormGroup) => {
    addWorkExperience(values);
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form noValidate>
            <Box mb='4'>
              <Field name='jobTitle'>
                {(fieldProps: FieldProps<string, CreateWorkExperienceDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='jobTitle'
                    label='Job Title'
                    type='text'
                    id='jobTitle'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                    isRequired
                  />
                )}
              </Field>

              <Field name='jobDescription'>
                {(fieldProps: FieldProps<string, CreateWorkExperienceDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='jobDescription'
                    label='Job Description'
                    type='text'
                    id='jobDescription'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                    isRequired
                  />
                )}
              </Field>

              <Field name='yearsOfExperience'>
                {(fieldProps: FieldProps<string, CreateWorkExperienceDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='yearsOfExperience'
                    label='Years of Experience'
                    type='text'
                    id='yearsOfExperience'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                    isRequired
                  />
                )}
              </Field>
            </Box>

            <Box mb='4'>
              <Button
                formNoValidate
                isLoading={isLoading}
                type='submit'
                isFullWidth
                color='gray.50'
                colorScheme='teal'
              >
                Add Work Experience
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
