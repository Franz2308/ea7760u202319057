import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Vehicle Charge domain entity.
 *
 * @author Frank Huingo - u202319057
 */
export class VehicleCharge implements BaseEntity {
  readonly id: number;
  readonly stationId: string;
  readonly vehicleType: string;
  readonly makeId: number;
  readonly makeName: string;
  readonly kwDemand: number;
  readonly chargingPortType: string;
  readonly isFastCharge: boolean;
  readonly registeredAt: string;

  constructor(
    id: number,
    stationId: string,
    vehicleType: string,
    makeId: number,
    makeName: string,
    kwDemand: number,
    chargingPortType: string,
    isFastCharge: boolean,
    registeredAt: string
  ) {
    this.id = id;
    this.stationId = stationId;
    this.vehicleType = vehicleType;
    this.makeId = makeId;
    this.makeName = makeName;
    this.kwDemand = kwDemand;
    this.chargingPortType = chargingPortType;
    this.isFastCharge = isFastCharge;
    this.registeredAt = registeredAt;
  }
}
