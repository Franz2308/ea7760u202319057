import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const stationsRoutes = () =>
  import('./stations/presentation/stations.routes').then(m => m.stationsRoutes);
const baseTitle = 'Tesla Supercharger & Fleet Platform';

/**
 * Root route configuration that composes bounded-context routes.
 *
 * @author Frank Huingo - u202319057
 */
export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home` },
  { path: 'charges', loadChildren: stationsRoutes, title: `${baseTitle} - Charges` },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` }
];
