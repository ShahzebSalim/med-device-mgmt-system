import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { DeviceList } from './pages/device-list/device-list';
import { DeviceDetail } from './pages/device-detail/device-detail';
import { PersonnelList } from './pages/personnel-list/personnel-list';
import { TeamList } from './pages/team-list/team-list';

export const routes: Routes = [
  // Forces the initial blank page load straight to the dashboard route
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  { path: 'dashboard', component: Dashboard },
  { path: 'devices', component: DeviceList },
  { path: 'devices/:id', component: DeviceDetail },
  { path: 'personnel', component: PersonnelList },
  { path: 'teams', component: TeamList },
];