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
  filtered: Device[] = [];
  loading = false;
  error = '';
  search = '';
  showForm = false;

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
    this.loading = true;
    this.error = '';
    this.api.list().subscribe({
      next: (d) => {
        this.devices = d;
        this.applySearch();
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load devices';
        this.loading = false;
      },
    });
  }

  applySearch(): void {
    const q = this.search.toLowerCase();
    this.filtered = q
      ? this.devices.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.udi.toLowerCase().includes(q) ||
            (d.version ?? '').toLowerCase().includes(q)
        )
      : [...this.devices];
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

  statusClass(status: string): string {
    return status === 'ACTIVE'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }
}
