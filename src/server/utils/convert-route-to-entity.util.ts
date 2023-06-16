const mapping: Record<string, string> = {
  'business-owners': 'business_owner',
  'climate-projects': 'climate_project',
  'environmental-impacts': 'environmental_impact',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
