import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface EnvironmentalImpactInterface {
  id?: string;
  co2_emissions: number;
  biodiversity_impact: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface EnvironmentalImpactGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
