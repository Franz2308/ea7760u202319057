import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import { StationsStore } from '../../../application/stations.store';
import { VehiclesApi } from '../../../../vehicles/infrastructure/vehicles-api';
import { VehicleMake } from '../../../../vehicles/domain/model/vehicle-make.entity';
import { VehicleCharge } from '../../../domain/model/vehicle-charge.entity';

/**
 * View component for registering a new electric vehicle charge.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-new-vehicle-charge',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TranslatePipe
  ],
  templateUrl: './new-vehicle-charge.html',
  styleUrl: './new-vehicle-charge.css'
})
export class NewVehicleCharge implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  public readonly store = inject(StationsStore);
  private readonly vehiclesApi = inject(VehiclesApi);

  public chargeForm!: FormGroup;
  public availableMakes: VehicleMake[] = [];
  public isLoadingMakes = false;
  public businessErrorKey: string | null = null;
  public isSubmitting = false;

  public readonly vehicleTypes: string[] = ['car', 'truck', 'multipurpose', 'motorcycle'];
  public readonly portTypes: string[] = ['NACS', 'CCS'];

  ngOnInit(): void {
    if (this.store.stations().length === 0) {
      this.store.loadAll();
    }
    this.initForm();
  }

  private initForm(): void {
    this.chargeForm = this.fb.group({
      vehicleType: ['', Validators.required],
      make: [null, Validators.required],
      chargingPortType: ['', Validators.required],
      kwDemand: [null, [Validators.required, Validators.min(1)]],
      isFastCharge: [false]
    });

    this.chargeForm.get('vehicleType')?.valueChanges.subscribe(vehicleType => {
      this.onVehicleTypeChange(vehicleType);
    });
  }

  public onVehicleTypeChange(vehicleType: string): void {
    this.businessErrorKey = null;
    this.chargeForm.get('make')?.reset();
    this.availableMakes = [];

    if (!vehicleType) {
      return;
    }

    this.isLoadingMakes = true;
    this.vehiclesApi.getMakesForVehicleType(vehicleType).subscribe({
      next: makes => {
        this.availableMakes = makes;
        this.isLoadingMakes = false;
      },
      error: () => {
        this.availableMakes = [];
        this.isLoadingMakes = false;
      }
    });
  }

  public onSubmit(): void {
    this.businessErrorKey = null;

    if (this.chargeForm.invalid) {
      this.chargeForm.markAllAsTouched();
      return;
    }

    const formValue = this.chargeForm.value;
    const vehicleType: string = formValue.vehicleType;
    const selectedMake: VehicleMake = formValue.make;
    const portType: string = formValue.chargingPortType;
    const kwDemand: number = Number(formValue.kwDemand);
    const isFastCharge: boolean = Boolean(formValue.isFastCharge);

    const station = this.store.getStationByVehicleType(vehicleType);
    if (!station) {
      this.businessErrorKey = 'new-charge.errors.no-station';
      return;
    }

    const validation = station.canAcceptCharge(this.store.charges(), kwDemand);
    if (!validation.isValid) {
      this.businessErrorKey = validation.errorKey || 'new-charge.errors.station-full';
      return;
    }

    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const registeredAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const maxId = this.store.charges().reduce((max, c) => (c.id > max ? c.id : max), 0);
    const newId = maxId + 1;

    const newCharge = new VehicleCharge(
      newId,
      station.id,
      vehicleType,
      selectedMake.id,
      selectedMake.name,
      kwDemand,
      portType,
      isFastCharge,
      registeredAt
    );

    this.isSubmitting = true;
    this.store.registerCharge(newCharge).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['home']);
      },
      error: () => {
        this.isSubmitting = false;
      }
    });
  }

  public onCancel(): void {
    this.router.navigate(['home']);
  }
}
