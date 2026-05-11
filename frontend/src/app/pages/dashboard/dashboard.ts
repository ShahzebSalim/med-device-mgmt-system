import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs'; 
import { DeviceService } from '../../services/device'; 
import { PersonnelService } from '../../services/personnel';
import { TeamService } from '../../services/team';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  deviceCount = 0;
  activeDeviceCount = 0;
  personnelCount = 0;
  teamCount = 0;
  teamStats: any[] = []; 
  loading = true;

  constructor(
    private deviceApi: DeviceService,
    private personnelApi: PersonnelService,
    private teamApi: TeamService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const [devices, personnel, teams] = await Promise.all([
        firstValueFrom(this.deviceApi.list()),
        firstValueFrom(this.personnelApi.list()),
        firstValueFrom(this.teamApi.list())
      ]);

      this.deviceCount = devices?.length || 0;
      this.activeDeviceCount = devices?.filter(d => d.status === 'ACTIVE').length || 0;
      this.personnelCount = personnel?.length || 0;
      this.teamCount = teams?.length || 0;

      if (teams && personnel) {
        this.teamStats = teams.map(t => {
          const members = personnel.filter(p => p.teamId === t.id).length;
          const percentage = this.personnelCount > 0 ? (members / this.personnelCount) * 100 : 0;
          return {
            name: t.name,
            count: members,
            pct: percentage
          };
        });
      }

    } catch (err) {
      console.error('Failed to load stats', err);
    } finally {
      this.loading = false;
    }
  }

  
  printReport(): void {
    window.print();
  }
}