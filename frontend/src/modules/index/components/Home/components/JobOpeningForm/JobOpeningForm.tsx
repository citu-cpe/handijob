import {
  Box,
  Button,
  Center,
  Checkbox,
  FormLabel,
  Wrap,
  Text,
  VStack,
  IconButton,
  Icon,
  Input as ChakraInput,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { Input } from '../../../../../../shared/components/form/Input/Input';
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from 'formik';
import React, { ChangeEvent, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Textarea } from '../../../../../../shared/components/form/Textrea/Textarea';
import { useGetCategories } from './hooks/useGetCategories';
import { CheckboxGroup } from '../../../../../../shared/components/form/CheckboxGroup/CheckboxGroup';
import { useAxios } from '../../../../../../shared/hooks/useAxios';
import { useQueryClient } from 'react-query';
import { CreateJobOpeningDTO } from 'generated-api';
import { BsFillImageFill } from 'react-icons/bs';
import { useToggle } from '../../../../../../shared/hooks/useToggle';

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
  const imagePreviewRef = useRef<HTMLDivElement>(null);
  const imagePreviewContainerRef = useRef<HTMLDivElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [showImagePicker, toggleShowImagePicker] = useToggle();

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

      const fileReader = new FileReader();

      fileReader.readAsDataURL(image);
      fileReader.onload = (ev) => {
        if (imagePreviewRef.current) {
          imagePreviewRef.current.style.backgroundImage = `url(${ev.target?.result})`;
          setHasImage(true);
        }
      };
    } else {
      removeImage(formProps);
    }
  };

  const toggleImagePicker = (formProps: FormikProps<FormGroup>) => {
    if (showImagePicker) {
      removeImage(formProps);
    }

    toggleShowImagePicker();
  };

  const removeImage = (formProps: FormikProps<FormGroup>) => {
    if (imagePreviewRef.current) {
      formProps.setFieldValue('image', '');
      imagePreviewRef.current.style.backgroundImage = '';
      setHasImage(false);
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
                  <Box>
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
              <Flex justifyContent='space-between'>
                <IconButton
                  aria-label='Choose image'
                  icon={<Icon as={BsFillImageFill} />}
                  onClick={() => toggleImagePicker(formProps)}
                />
                {hasImage && (
                  <CloseButton
                    color='teal.500'
                    onClick={() => {
                      removeImage(formProps);
                    }}
                  />
                )}
              </Flex>
              {showImagePicker && (
                <Field name='image'>
                  {() => (
                    <>
                      <FormLabel
                        htmlFor='image'
                        mb='2'
                        color='gray.800'
                        fontWeight='semibold'
                      >
                        <Box
                          p='4'
                          bgColor='gray.300'
                          rounded='md'
                          pos='relative'
                          my='4'
                          ref={imagePreviewContainerRef}
                          transition='all .2s ease-out'
                        >
                          <Center
                            cursor='pointer'
                            bg='gray.300'
                            h='52'
                            w='100%'
                            borderStyle='dashed'
                            borderWidth='thick'
                            borderColor='gray.200'
                            border={hasImage ? 'none' : undefined}
                            rounded='md'
                            bgRepeat='no-repeat'
                            bgPos='center'
                            bgSize='cover'
                            ref={imagePreviewRef}
                            textAlign='center'
                            transition='all .2s ease-out'
                          >
                            <VStack display={hasImage ? 'none' : undefined}>
                              <Text color='teal.500'>Add a photo</Text>
                              <Text color='gray.200'>
                                (accepts .jpg, .jpg, or .png files)
                              </Text>
                            </VStack>
                          </Center>
                          <ChakraInput
                            name='image'
                            type='file'
                            accept='.jpg, .jpeg, .png'
                            id='image'
                            onChange={(e) => {
                              handleOnChange(e, formProps);
                            }}
                            opacity='0'
                            pos='absolute'
                            top='0'
                            left='0'
                            w='full'
                            h='full'
                            cursor='pointer'
                            onMouseOver={() => {
                              if (
                                imagePreviewRef.current &&
                                imagePreviewContainerRef.current &&
                                !hasImage
                              ) {
                                imagePreviewRef.current.style.backgroundColor =
                                  '#A0AEC0';
                                imagePreviewContainerRef.current.style.backgroundColor =
                                  '#A0AEC0';
                              }
                            }}
                            onMouseLeave={() => {
                              if (
                                imagePreviewRef.current &&
                                imagePreviewContainerRef.current
                              ) {
                                imagePreviewRef.current.style.backgroundColor =
                                  '';
                                imagePreviewContainerRef.current.style.backgroundColor =
                                  '';
                              }
                            }}
                          />
                        </Box>
                      </FormLabel>
                    </>
                  )}
                </Field>
              )}
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
