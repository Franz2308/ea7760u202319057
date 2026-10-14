/**
 * Production environment configuration.
 *
 * @summary
 * Defines external and local REST endpoints for the Tesla Supercharger platform.
 *
 * @author Frank Huingo - u202319057
 */
export const environment = {
  production: true,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderChargingStationsEndpointPath: '/charging-stations',
  platformProviderVehicleChargesEndpointPath: '/vehicle-charges',
  nhtsaProviderApiBaseUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType',
  logoProviderApiBaseUrl: 'https://img.logo.dev/tesla.com'
};
