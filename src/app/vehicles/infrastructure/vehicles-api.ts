import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { environment } from '../../../environments/environment';
import { VehicleMake } from '../domain/model/vehicle-make.entity';
import { VehicleMakesResponse } from './vehicle-makes-response';
import { VehicleMakeAssembler } from './vehicle-make-assembler';

/**
 * Infrastructure API facade for external vehicle makes operations.
 *
 * @author Frank Huingo - u202319057
 */
@Injectable({
  providedIn: 'root'
})
export class VehiclesApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.nhtsaProviderApiBaseUrl;
  private readonly assembler = new VehicleMakeAssembler();

  /**
   * Retrieves all vehicle makes for a specific vehicle type.
   *
   * @param vehicleType - Type parameter (e.g. car, truck, multipurpose, motorcycle).
   * @returns Stream with mapped VehicleMake entities.
   */
  public getMakesForVehicleType(vehicleType: string): Observable<VehicleMake[]> {
    const url = `${this.baseUrl}/${encodeURIComponent(vehicleType)}?format=json`;
    return this.http.get<VehicleMakesResponse>(url).pipe(
      map(response => this.assembler.toEntitiesFromResponse(response))
    );
  }
}
