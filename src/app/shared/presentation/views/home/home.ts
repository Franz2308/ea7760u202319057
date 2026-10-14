import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { StationsStore } from '../../../../stations/application/stations.store';
import { StationSummary } from '../../../../stations/presentation/components/station-summary/station-summary';

/**
 * Home view for the shared presentation context.
 *
 * @author Frank Huingo - u202319057
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    TranslatePipe,
    StationSummary
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  public readonly store = inject(StationsStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
