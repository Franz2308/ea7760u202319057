import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { VehicleCharge } from '../domain/model/vehicle-charge.entity';
import { VehicleChargeResource, VehicleChargesResponse } from './vehicle-charges-response';
import { VehicleChargeAssembler } from './vehicle-charge-assembler';
import { environment } from '../../../environments/environment';

/**
 * REST endpoint client for vehicle charge CRUD operations.
 *
 * @author Frank Huingo - u202319057
 */
export class VehicleChargesApiEndpoint extends BaseApiEndpoint<
  VehicleCharge,
  VehicleChargeResource,
  VehicleChargesResponse,
  VehicleChargeAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderVehicleChargesEndpointPath}`,
      new VehicleChargeAssembler()
    );
  }
}
