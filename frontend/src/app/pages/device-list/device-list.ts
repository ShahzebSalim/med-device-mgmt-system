import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/device';
import { TeamService } from '../../services/team'; // Added TeamService
import { Device } from '../../models/device';
import { MockAuthService } from '../../services/mock-auth';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList implements OnInit {
  auth = inject(MockAuthService);
  private teamApi = inject(TeamService); // Injecting team service

  devices: Device[] = [];
  teams: any[] = []; // Array to hold engineering teams
  error = '';
  loading = false;
  showForm = false;
  search = '';

  form: Partial<Device> = {
    name: '',
    udi: '',
    version: '',
    status: 'ACTIVE',
    teamId: undefined // Initialize teamId for the form
  };

  constructor(private api: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.load();
    this.loadTeams(); // Load teams on startup
  }

  load(): void {
    this.error = '';
    this.loading = true;
    this.api.list().subscribe({
      next: (d) => {
        this.devices = d;
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load devices';
        this.loading = false;
      },
    });
  }

  // Load teams for the selection dropdown
  loadTeams(): void {
    this.teamApi.list().subscribe({
      next: (t) => (this.teams = t),
      error: (e) => (this.error = 'Failed to load engineering teams')
    });
  }

  create(): void {
    this.error = '';
    this.api.create(this.form).subscribe({
      next: () => {
        // Reset form including teamId
        this.form = { name: '', udi: '', version: '', status: 'ACTIVE', teamId: undefined };
        this.showForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create device'),
    });
  }

  open(d: Device): void {
    this.router.navigate(['/devices', d.id]);
  }

  deleteDevice(id: number | undefined, event: Event): void {
    event.stopPropagation(); 
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this device?')) {
      this.api.delete(id).subscribe({
        next: () => this.load(),
        error: (e: any) => (this.error = e?.error?.message ?? 'Failed to delete device')
      });
    }
  }

  get filtered(): Device[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.devices;
    return this.devices.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.udi.toLowerCase().includes(q) ||
        (d.teamName && d.teamName.toLowerCase().includes(q)) // Search by team name
    );
  }

  statusClass(status: string): string {
    if (status === 'ACTIVE') return 'bg-green-100 text-green-800';
    if (status === 'INACTIVE') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-700';
  }
}