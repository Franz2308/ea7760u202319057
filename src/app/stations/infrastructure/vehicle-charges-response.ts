import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Vehicle charge resource exchanged with API endpoints.
 *
 * @author Frank Huingo - u202319057
 */
export interface VehicleChargeResource extends BaseResource {
  id?: number;
  stationId: string;
  vehicleType: string;
  makeId: number;
  makeName: string;
  kwDemand: number;
  chargingPortType: string;
  isFastCharge: boolean;
  registeredAt: string;
}

/**
 * Response envelope for vehicle charge collection queries.
 */
export interface VehicleChargesResponse extends BaseResponse {
  charges?: VehicleChargeResource[];
}
