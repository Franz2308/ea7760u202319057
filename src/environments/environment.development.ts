/**
 * Development environment configuration.
 *
 * @summary
 * Defines development configuration variables for testing with json-server.
 *
 * @author Frank Huingo - u202319057
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderChargingStationsEndpointPath: '/charging-stations',
  platformProviderVehicleChargesEndpointPath: '/vehicle-charges',
  nhtsaProviderApiBaseUrl: 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType',
  logoProviderApiBaseUrl: 'https://img.logo.dev/tesla.com'
};
