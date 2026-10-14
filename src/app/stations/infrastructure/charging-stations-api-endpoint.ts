import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { ChargingStationResource, ChargingStationsResponse } from './charging-stations-response';
import { ChargingStationAssembler } from './charging-station-assembler';
import { environment } from '../../../environments/environment';

/**
 * REST endpoint client for charging station CRUD operations.
 *
 * @author Frank Huingo - u202319057
 */
export class ChargingStationsApiEndpoint extends BaseApiEndpoint<
  ChargingStation,
  ChargingStationResource,
  ChargingStationsResponse,
  ChargingStationAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderChargingStationsEndpointPath}`,
      new ChargingStationAssembler()
    );
  }
}
