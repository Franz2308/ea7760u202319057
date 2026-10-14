import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Charging station resource exchanged with API endpoints.
 *
 * @author Frank Huingo - u202319057
 */
export interface ChargingStationResource extends BaseResource {
  id: string;
  stationName: string;
  vehicleType: string;
  maxGridKwCapacity: number;
  stallsAvailable: number;
  isActive: boolean;
  locationCoordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Response envelope for charging station collection queries.
 */
export interface ChargingStationsResponse extends BaseResponse {
  stations?: ChargingStationResource[];
}
