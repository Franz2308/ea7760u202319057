import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { VehicleCharge } from '../domain/model/vehicle-charge.entity';
import { VehicleChargeResource, VehicleChargesResponse } from './vehicle-charges-response';

/**
 * Assembler class for VehicleCharge resources and entities.
 *
 * @author Frank Huingo - u202319057
 */
export class VehicleChargeAssembler
  implements BaseAssembler<VehicleCharge, VehicleChargeResource, VehicleChargesResponse>
{
  public toEntityFromResource(resource: VehicleChargeResource): VehicleCharge {
    return new VehicleCharge(
      resource.id ?? 0,
      resource.stationId,
      resource.vehicleType,
      resource.makeId,
      resource.makeName,
      resource.kwDemand,
      resource.chargingPortType,
      resource.isFastCharge,
      resource.registeredAt
    );
  }

  public toResourceFromEntity(entity: VehicleCharge): VehicleChargeResource {
    return {
      stationId: entity.stationId,
      vehicleType: entity.vehicleType,
      makeId: entity.makeId,
      makeName: entity.makeName,
      kwDemand: entity.kwDemand,
      chargingPortType: entity.chargingPortType,
      isFastCharge: entity.isFastCharge,
      registeredAt: entity.registeredAt
    };
  }

  public toEntitiesFromResponse(response: VehicleChargesResponse | VehicleChargeResource[]): VehicleCharge[] {
    if (Array.isArray(response)) {
      return response.map(resource => this.toEntityFromResource(resource));
    }
    if (response && Array.isArray(response.charges)) {
      return response.charges.map(resource => this.toEntityFromResource(resource));
    }
    return [];
  }
}
