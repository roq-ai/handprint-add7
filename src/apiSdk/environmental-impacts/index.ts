import axios from 'axios';
import queryString from 'query-string';
import { EnvironmentalImpactInterface, EnvironmentalImpactGetQueryInterface } from 'interfaces/environmental-impact';
import { GetQueryInterface } from '../../interfaces';

export const getEnvironmentalImpacts = async (query?: EnvironmentalImpactGetQueryInterface) => {
  const response = await axios.get(`/api/environmental-impacts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnvironmentalImpact = async (environmentalImpact: EnvironmentalImpactInterface) => {
  const response = await axios.post('/api/environmental-impacts', environmentalImpact);
  return response.data;
};

export const updateEnvironmentalImpactById = async (id: string, environmentalImpact: EnvironmentalImpactInterface) => {
  const response = await axios.put(`/api/environmental-impacts/${id}`, environmentalImpact);
  return response.data;
};

export const getEnvironmentalImpactById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/environmental-impacts/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteEnvironmentalImpactById = async (id: string) => {
  const response = await axios.delete(`/api/environmental-impacts/${id}`);
  return response.data;
};
