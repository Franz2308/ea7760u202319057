import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { ChargingStationResource, ChargingStationsResponse } from './charging-stations-response';

/**
 * Assembler class for ChargingStation resources and entities.
 *
 * @author Frank Huingo - u202319057
 */
export class ChargingStationAssembler
  implements BaseAssembler<ChargingStation, ChargingStationResource, ChargingStationsResponse>
{
  public toEntityFromResource(resource: ChargingStationResource): ChargingStation {
    return new ChargingStation(
      resource.id,
      resource.stationName,
      resource.vehicleType,
      resource.maxGridKwCapacity,
      resource.stallsAvailable,
      resource.isActive,
      {
        lat: resource.locationCoordinates ? resource.locationCoordinates.lat : 0,
        lng: resource.locationCoordinates ? resource.locationCoordinates.lng : 0
      }
    );
  }

  public toResourceFromEntity(entity: ChargingStation): ChargingStationResource {
    return {
      id: entity.id,
      stationName: entity.stationName,
      vehicleType: entity.vehicleType,
      maxGridKwCapacity: entity.maxGridKwCapacity,
      stallsAvailable: entity.stallsAvailable,
      isActive: entity.isActive,
      locationCoordinates: entity.locationCoordinates
    };
  }

  public toEntitiesFromResponse(response: ChargingStationsResponse | ChargingStationResource[]): ChargingStation[] {
    if (Array.isArray(response)) {
      return response.map(resource => this.toEntityFromResource(resource));
    }
    if (response && Array.isArray(response.stations)) {
      return response.stations.map(resource => this.toEntityFromResource(resource));
    }
    return [];
  }
}
