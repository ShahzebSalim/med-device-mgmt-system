import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard'; // Added this
import { DeviceList } from './pages/device-list/device-list';
import { DeviceDetail } from './pages/device-detail/device-detail';
import { PersonnelList } from './pages/personnel-list/personnel-list';
import { TeamList } from './pages/team-list/team-list';

export const routes: Routes = [
  // Change the default redirect to your new Dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
  // Add the Dashboard route
  { path: 'dashboard', component: Dashboard },
  
  { path: 'devices', component: DeviceList },
  { path: 'devices/:id', component: DeviceDetail },
  { path: 'personnel', component: PersonnelList },
  { path: 'teams', component: TeamList },
];