import { Box, Button, Checkbox, Wrap } from '@chakra-ui/react';
import { Input } from '../../../../../../shared/components/form/Input/Input';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import React, { ChangeEvent, useState } from 'react';
import * as Yup from 'yup';
import { Textarea } from '../../../../../../shared/components/form/Textrea/Textarea';
import { useGetCategories } from './hooks/useGetCategories';
import { CheckboxGroup } from '../../../../../../shared/components/form/CheckboxGroup/CheckboxGroup';
import { useAxios } from '../../../../../../shared/hooks/useAxios';
import { useQueryClient } from 'react-query';
import { CreateJobOpeningDTO } from 'generated-api';

interface JobOpeningFormProps {
  onClose?: () => void;
}

interface FormGroup {
  title: string;
  description: string;
  image: string;
  categories: never[];
}

export const JobOpeningForm = ({ onClose }: JobOpeningFormProps) => {
  const { categories } = useGetCategories();
  const axios = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const initialValues = {
    title: '',
    description: '',
    image: '',
    categories: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    categories: Yup.array()
      .min(1, 'Choose at least one category')
      .required('Required'),
    image: Yup.mixed(),
  });

  const onSubmit = async (
    values: FormGroup,
    formikHelpers: FormikHelpers<FormGroup>
  ) => {
    const { title, description, categories: categoriesValue, image } = values;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    categoriesValue.forEach((category) =>
      formData.append('categories[]', category)
    );

    setIsLoading(true);
    await axios.post('/job-opening', formData);
    setIsLoading(false);
    formikHelpers.resetForm();
    queryClient.invalidateQueries('jobOpenings');

    if (onClose) {
      onClose();
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement>,
    formProps: FormikProps<FormGroup>
  ) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      formProps.setFieldValue('image', image);
    } else {
      formProps.setFieldValue('image', '');
    }
  };

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formProps) => (
          <Form noValidate>
            <Box mb='4'>
              <Field name='title'>
                {(fieldProps: FieldProps<string, CreateJobOpeningDTO>) => (
                  <Input
                    fieldProps={fieldProps}
                    name='title'
                    label='Title'
                    type='text'
                    id='title'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                    isRequired
                  />
                )}
              </Field>
              <Field name='description'>
                {(fieldProps: FieldProps<string, CreateJobOpeningDTO>) => (
                  <Textarea
                    fieldProps={fieldProps}
                    name='description'
                    label='Description'
                    id='description'
                    borderColor='gray.300'
                    bgColor='gray.50'
                    color='gray.800'
                    resize='none'
                    isRequired
                  />
                )}
              </Field>
              <Field name='categories'>
                {(fieldProps: FieldProps<string, CreateJobOpeningDTO>) => (
                  <Box mb='8'>
                    <CheckboxGroup
                      defaultValue={[]}
                      colorScheme='teal'
                      fieldProps={fieldProps}
                      name='categories'
                      label='Choose at least one category for this job:'
                      id='description'
                      isRequired
                      onChange={(val) => {
                        fieldProps.form.setFieldValue('categories', val, true);
                      }}
                    >
                      <Wrap spacing='4'>
                        {categories.map((category) => (
                          <Checkbox key={category.name} value={category.name}>
                            {category.name}
                          </Checkbox>
                        ))}
                      </Wrap>
                    </CheckboxGroup>
                  </Box>
                )}
              </Field>
              <Field name='image'>
                {() => (
                  <input
                    name='image'
                    type='file'
                    accept='.jpg, .jpeg, .png'
                    id='title'
                    color='gray.800'
                    onChange={(e) => {
                      handleOnChange(e, formProps);
                    }}
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
                Create Job Opening
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
