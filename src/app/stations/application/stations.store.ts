import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { ChargingStation } from '../domain/model/charging-station.entity';
import { VehicleCharge } from '../domain/model/vehicle-charge.entity';
import { StationsApi } from '../infrastructure/stations-api';

/**
 * Application state store managing charging stations and vehicle charges.
 *
 * @remarks
 * Coordinates station and charge collections, reactive loading states, and error handling
 * using Angular Signals, adhering to the UPC application store pattern.
 *
 * @author Frank Huingo - u202319057
 */
@Injectable({
  providedIn: 'root'
})
export class StationsStore {
  private readonly stationsApi = inject(StationsApi);

  private readonly stationsSignal = signal<ChargingStation[]>([]);
  public readonly stations = this.stationsSignal.asReadonly();

  private readonly chargesSignal = signal<VehicleCharge[]>([]);
  public readonly charges = this.chargesSignal.asReadonly();

  private readonly loadingSignal = signal<boolean>(false);
  public readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  public readonly error = this.errorSignal.asReadonly();

  public readonly activeStations = computed(() =>
    this.stations().filter(station => station.isActive)
  );

  public readonly stationsCount = computed(() => this.stations().length);
  public readonly chargesCount = computed(() => this.charges().length);

  constructor() {
    this.loadAll();
  }

  /**
   * Loads all charging stations and vehicle charges concurrently.
   */
  public loadAll = (): void => {
    this.loadStations();
    this.loadCharges();
  };

  /**
   * Loads charging stations from the API.
   */
  public loadStations = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.stationsApi.getChargingStations().pipe(retry(2)).subscribe({
      next: stations => {
        this.stationsSignal.set(stations);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load charging stations'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Loads vehicle charges from the API.
   */
  public loadCharges = (): void => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.stationsApi.getVehicleCharges().pipe(retry(2)).subscribe({
      next: charges => {
        this.chargesSignal.set(charges);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load vehicle charges'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Persists a new vehicle charge session and updates reactive signal state.
   *
   * @param charge - Vehicle charge entity to register.
   * @returns Observable of the persisted entity.
   */
  public registerCharge = (charge: VehicleCharge): Observable<VehicleCharge> => {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    return this.stationsApi.createVehicleCharge(charge).pipe(
      retry(1),
      tap({
        next: created => {
          this.chargesSignal.update(existing => [...existing, created]);
          this.loadingSignal.set(false);
        },
        error: err => {
          this.errorSignal.set(this.formatError(err, 'Failed to register vehicle charge'));
          this.loadingSignal.set(false);
        }
      })
    );
  };

  /**
   * Finds a charging station for a given vehicle type.
   *
   * @param vehicleType - Vehicle type identifier string.
   */
  public getStationByVehicleType = (vehicleType: string): ChargingStation | undefined => {
    return this.stations().find(
      s => s.vehicleType.toLowerCase() === vehicleType.toLowerCase()
    );
  };

  private formatError = (error: unknown, fallback: string): string => {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? `${fallback}: Not found` : error.message;
    }
    return fallback;
  };
}
