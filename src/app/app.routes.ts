import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { EndpointBuilder } from './components/endpoint-builder/endpoint-builder';
import { MockServers } from './components/mock-servers/mock-servers';
import { Documentation } from './components/documentation/documentation';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'mock-servers', component: MockServers },
  { path: 'documentation', component: Documentation },
  { path: 'add', component: EndpointBuilder },
  { path: '**', redirectTo: '' }
];