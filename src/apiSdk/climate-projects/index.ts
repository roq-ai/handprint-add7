import axios from 'axios';
import queryString from 'query-string';
import { ClimateProjectInterface, ClimateProjectGetQueryInterface } from 'interfaces/climate-project';
import { GetQueryInterface } from '../../interfaces';

export const getClimateProjects = async (query?: ClimateProjectGetQueryInterface) => {
  const response = await axios.get(`/api/climate-projects${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createClimateProject = async (climateProject: ClimateProjectInterface) => {
  const response = await axios.post('/api/climate-projects', climateProject);
  return response.data;
};

export const updateClimateProjectById = async (id: string, climateProject: ClimateProjectInterface) => {
  const response = await axios.put(`/api/climate-projects/${id}`, climateProject);
  return response.data;
};

export const getClimateProjectById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/climate-projects/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteClimateProjectById = async (id: string) => {
  const response = await axios.delete(`/api/climate-projects/${id}`);
  return response.data;
};
