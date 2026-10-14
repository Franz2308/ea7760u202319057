import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Vehicle Make domain entity.
 *
 * @summary
 * Represents an automotive brand/make retrieved from the NHTSA external vehicle API.
 *
 * @author Frank Huingo - u202319057
 */
export class VehicleMake implements BaseEntity {
  readonly id: number;
  readonly name: string;
  readonly vehicleTypeId: number;
  readonly vehicleTypeName: string;

  constructor(id: number, name: string, vehicleTypeId: number = 0, vehicleTypeName: string = '') {
    this.id = id;
    this.name = name;
    this.vehicleTypeId = vehicleTypeId;
    this.vehicleTypeName = vehicleTypeName;
  }
}
