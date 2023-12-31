import * as yup from 'yup';

export const climateProjectValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  organization_id: yup.string().nullable(),
});
