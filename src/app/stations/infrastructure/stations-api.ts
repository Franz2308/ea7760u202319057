import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { VehicleCharge } from '../domain/model/vehicle-charge.entity';
import { ChargingStationsApiEndpoint } from './charging-stations-api-endpoint';
import { VehicleChargesApiEndpoint } from './vehicle-charges-api-endpoint';

/**
 * Infrastructure facade for charging station and vehicle charge endpoint operations.
 *
 * @author Frank Huingo - u202319057
 */
@Injectable({
  providedIn: 'root'
})
export class StationsApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly chargingStationsEndpoint = new ChargingStationsApiEndpoint(this.http);
  private readonly vehicleChargesEndpoint = new VehicleChargesApiEndpoint(this.http);

  public getChargingStations = (): Observable<ChargingStation[]> =>
    this.chargingStationsEndpoint.getAll();

  public getChargingStation = (id: string): Observable<ChargingStation> =>
    this.chargingStationsEndpoint.getById(id);

  public getVehicleCharges = (): Observable<VehicleCharge[]> =>
    this.vehicleChargesEndpoint.getAll();

  public createVehicleCharge = (charge: VehicleCharge): Observable<VehicleCharge> =>
    this.vehicleChargesEndpoint.create(charge);
}
