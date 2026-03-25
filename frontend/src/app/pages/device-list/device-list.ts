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
    this.api.list().subscribe({
      next: (d) => (this.devices = d),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load devices'),
    });
  }

  create(): void {
    this.error = '';
    this.api.create(this.form).subscribe({
      next: () => {
        this.form = { name: '', udi: '', version: '', status: 'ACTIVE' };
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create device'),
    });
  }

  open(d: Device): void {
    this.router.navigate(['/devices', d.id]);
  }
}
