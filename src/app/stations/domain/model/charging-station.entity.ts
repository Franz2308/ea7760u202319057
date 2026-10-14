import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { VehicleCharge } from './vehicle-charge.entity';

/**
 * Charging Station domain entity.
 *
 * @remarks
 * Encapsulates domain logic and formulas: Total Grid Load, Available Grid Margin,
 * Active Stalls Ratio, and simultaneous registration validation rules.
 *
 * @author Frank Huingo - u202319057
 */
export class ChargingStation implements BaseEntity {
  readonly id: string;
  readonly stationName: string;
  readonly vehicleType: string;
  readonly maxGridKwCapacity: number;
  readonly stallsAvailable: number;
  readonly isActive: boolean;
  readonly locationCoordinates: {
    lat: number;
    lng: number;
  };

  constructor(
    id: string,
    stationName: string,
    vehicleType: string,
    maxGridKwCapacity: number,
    stallsAvailable: number,
    isActive: boolean,
    locationCoordinates: { lat: number; lng: number }
  ) {
    this.id = id;
    this.stationName = stationName;
    this.vehicleType = vehicleType;
    this.maxGridKwCapacity = maxGridKwCapacity;
    this.stallsAvailable = stallsAvailable;
    this.isActive = isActive;
    this.locationCoordinates = locationCoordinates;
  }

  public getChargesForStation(allCharges: VehicleCharge[]): VehicleCharge[] {
    if (!allCharges || allCharges.length === 0) {
      return [];
    }
    return allCharges.filter(charge => charge.stationId === this.id);
  }

  public calculateTotalGridLoad(allCharges: VehicleCharge[]): number {
    const stationCharges = this.getChargesForStation(allCharges);
    const sum = stationCharges.reduce((acc, curr) => acc + (curr.kwDemand || 0), 0);
    return Math.round(sum * 100) / 100;
  }

  public calculateAvailableGridMargin(allCharges: VehicleCharge[]): number {
    const totalLoad = this.calculateTotalGridLoad(allCharges);
    const margin = this.maxGridKwCapacity - totalLoad;
    return Math.round(margin * 100) / 100;
  }

  public calculateActiveStallsRatio(allCharges: VehicleCharge[]): string {
    const activeCount = this.getChargesForStation(allCharges).length;
    return `${activeCount} / ${this.stallsAvailable} Stalls`;
  }

  public canAcceptCharge(
    allCharges: VehicleCharge[],
    requestedKw: number
  ): { isValid: boolean; errorKey?: string } {
    if (!this.isActive) {
      return { isValid: false, errorKey: 'new-charge.errors.station-inactive' };
    }

    const stationCharges = this.getChargesForStation(allCharges);
    if (stationCharges.length >= this.stallsAvailable) {
      return { isValid: false, errorKey: 'new-charge.errors.station-full' };
    }

    const availableMargin = this.calculateAvailableGridMargin(allCharges);
    if (requestedKw > availableMargin) {
      return { isValid: false, errorKey: 'new-charge.errors.exceeds-margin' };
    }

    return { isValid: true };
  }
}
