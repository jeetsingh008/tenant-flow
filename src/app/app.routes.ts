import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { TenantDetail } from './components/tenant-detail/tenant-detail';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tenant/:id', component: TenantDetail }
];