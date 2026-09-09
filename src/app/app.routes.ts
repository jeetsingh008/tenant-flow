import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { TenantDetail } from './components/tenant-detail/tenant-detail';
import { AddTenant } from './components/add-tenant/add-tenant';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'tenant/:id', component: TenantDetail },
    { path: 'dashboard', component: Dashboard },
  { path: 'add-tenant', component: AddTenant}
];