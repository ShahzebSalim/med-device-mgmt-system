import { Routes } from '@angular/router';
import { DeviceList } from './pages/device-list/device-list';
import { DeviceDetail } from './pages/device-detail/device-detail';
import { PersonnelList } from './pages/personnel-list/personnel-list';
import { TeamList } from './pages/team-list/team-list';

export const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  { path: 'devices', component: DeviceList },
  { path: 'devices/:id', component: DeviceDetail },
  { path: 'personnel', component: PersonnelList },
  { path: 'teams', component: TeamList },
];
