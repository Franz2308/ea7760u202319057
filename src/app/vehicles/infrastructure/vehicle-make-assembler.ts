import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { VehicleMake } from '../domain/model/vehicle-make.entity';
import { VehicleMakeResource, VehicleMakesResponse } from './vehicle-makes-response';

/**
 * Assembler class for converting NHTSA vehicle make resources to domain entities.
 *
 * @author Frank Huingo - u202319057
 */
export class VehicleMakeAssembler
  implements BaseAssembler<VehicleMake, VehicleMakeResource, VehicleMakesResponse>
{
  public toEntityFromResource(resource: VehicleMakeResource): VehicleMake {
    return new VehicleMake(
      resource.MakeId,
      resource.MakeName,
      resource.VehicleTypeId,
      resource.VehicleTypeName
    );
  }

  public toResourceFromEntity(entity: VehicleMake): VehicleMakeResource {
    return {
      id: entity.id,
      MakeId: entity.id,
      MakeName: entity.name,
      VehicleTypeId: entity.vehicleTypeId,
      VehicleTypeName: entity.vehicleTypeName
    };
  }

  public toEntitiesFromResponse(response: VehicleMakesResponse): VehicleMake[] {
    if (!response || !Array.isArray(response.Results)) {
      return [];
    }
    return response.Results.map(resource => this.toEntityFromResource(resource));
  }
}
