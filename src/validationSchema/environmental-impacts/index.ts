import * as yup from 'yup';

export const environmentalImpactValidationSchema = yup.object().shape({
  co2_emissions: yup.number().integer().required(),
  biodiversity_impact: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
