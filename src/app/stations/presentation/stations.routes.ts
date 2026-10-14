import { Routes } from '@angular/router';

const newVehicleCharge = () =>
  import('./views/new-vehicle-charge/new-vehicle-charge').then(m => m.NewVehicleCharge);

/**
 * Route tree for stations presentation views.
 *
 * @author Frank Huingo - u202319057
 */
export const stationsRoutes: Routes = [
  { path: 'new', loadComponent: newVehicleCharge }
];
