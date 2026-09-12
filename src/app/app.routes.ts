import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { EndpointBuilder } from './components/endpoint-builder/endpoint-builder';

export const routes: Routes = [
  { path: '', component: Dashboard }, // Dashboard as home page
  { path: 'add', component: EndpointBuilder },
  { path: '**', redirectTo: '' } // Catch-all redirect to dashboard
];