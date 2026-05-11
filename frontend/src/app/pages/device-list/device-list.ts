import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/device';
import { Device } from '../../models/device';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './device-list.html',
  styleUrl: './device-list.css',
})
export class DeviceList implements OnInit {
  devices: Device[] = [];
  error = '';
  loading = false;
  showForm = false;
  search = '';

  form: Partial<Device> = {
    name: '',
    udi: '',
    version: '',
    status: 'ACTIVE',
  };

  constructor(private api: DeviceService, private router: Router) {}

  ngOnInit(): void {
    this.load();
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

  create(): void {
    this.error = '';
    this.api.create(this.form).subscribe({
      next: () => {
        this.form = { name: '', udi: '', version: '', status: 'ACTIVE' };
        this.showForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create device'),
    });
  }

  open(d: Device): void {
    this.router.navigate(['/devices', d.id]);
  }

  get filtered(): Device[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.devices;
    return this.devices.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.udi.toLowerCase().includes(q) ||
        d.version.toLowerCase().includes(q)
    );
  }

  statusClass(status: string): string {
    if (status === 'ACTIVE') return 'bg-green-100 text-green-800';
    if (status === 'INACTIVE') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-700';
  }
}
