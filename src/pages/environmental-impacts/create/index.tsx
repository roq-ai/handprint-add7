import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createEnvironmentalImpact } from 'apiSdk/environmental-impacts';
import { Error } from 'components/error';
import { environmentalImpactValidationSchema } from 'validationSchema/environmental-impacts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';
import { EnvironmentalImpactInterface } from 'interfaces/environmental-impact';

function EnvironmentalImpactCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EnvironmentalImpactInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEnvironmentalImpact(values);
      resetForm();
      router.push('/environmental-impacts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EnvironmentalImpactInterface>({
    initialValues: {
      co2_emissions: 0,
      biodiversity_impact: 0,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: environmentalImpactValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Environmental Impact
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="co2_emissions" mb="4" isInvalid={!!formik.errors?.co2_emissions}>
            <FormLabel>Co 2 Emissions</FormLabel>
            <NumberInput
              name="co2_emissions"
              value={formik.values?.co2_emissions}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('co2_emissions', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.co2_emissions && <FormErrorMessage>{formik.errors?.co2_emissions}</FormErrorMessage>}
          </FormControl>
          <FormControl id="biodiversity_impact" mb="4" isInvalid={!!formik.errors?.biodiversity_impact}>
            <FormLabel>Biodiversity Impact</FormLabel>
            <NumberInput
              name="biodiversity_impact"
              value={formik.values?.biodiversity_impact}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('biodiversity_impact', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.biodiversity_impact && (
              <FormErrorMessage>{formik.errors?.biodiversity_impact}</FormErrorMessage>
            )}
          </FormControl>
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'environmental_impact',
  operation: AccessOperationEnum.CREATE,
})(EnvironmentalImpactCreatePage);
