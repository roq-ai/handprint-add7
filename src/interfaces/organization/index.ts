import { BusinessOwnerInterface } from 'interfaces/business-owner';
import { ClimateProjectInterface } from 'interfaces/climate-project';
import { EnvironmentalImpactInterface } from 'interfaces/environmental-impact';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  business_owner?: BusinessOwnerInterface[];
  climate_project?: ClimateProjectInterface[];
  environmental_impact?: EnvironmentalImpactInterface[];
  user?: UserInterface;
  _count?: {
    business_owner?: number;
    climate_project?: number;
    environmental_impact?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
