import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { TranslatePipe } from '@ngx-translate/core';
import { ChargingStation } from '../../../domain/model/charging-station.entity';
import { VehicleCharge } from '../../../domain/model/vehicle-charge.entity';

/**
 * Station Summary Card component.
 *
 * @summary
 * Renders an Angular Material card displaying station KPIs and active vehicle charges.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-station-summary',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
    TranslatePipe,
    DecimalPipe,
    DatePipe
  ],
  templateUrl: './station-summary.html',
  styleUrl: './station-summary.css'
})
export class StationSummary {
  @Input({ required: true }) public station!: ChargingStation;
  @Input({ required: true }) public allCharges: VehicleCharge[] = [];

  public get stationCharges(): VehicleCharge[] {
    return this.station ? this.station.getChargesForStation(this.allCharges) : [];
  }

  public get totalGridLoad(): number {
    return this.station ? this.station.calculateTotalGridLoad(this.allCharges) : 0;
  }

  public get availableGridMargin(): number {
    return this.station ? this.station.calculateAvailableGridMargin(this.allCharges) : 0;
  }

  public get activeStallsRatio(): string {
    return this.station ? this.station.calculateActiveStallsRatio(this.allCharges) : '0 / 0 Stalls';
  }
}
