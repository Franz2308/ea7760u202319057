import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Resource representing a vehicle make from the NHTSA API.
 *
 * @author Frank Huingo - u202319057
 */
export interface VehicleMakeResource extends BaseResource {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

/**
 * Response envelope returned by the NHTSA vehicle make query.
 *
 * @author Frank Huingo - u202319057
 */
export interface VehicleMakesResponse extends BaseResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: VehicleMakeResource[];
}
