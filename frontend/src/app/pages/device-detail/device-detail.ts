import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeviceService } from '../../services/device';
import { CertificationService } from '../../services/certification';
import { Device } from '../../models/device';
import { Certification } from '../../models/certification';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.css',
})
export class DeviceDetail implements OnInit {
  deviceId!: number;

  device?: Device;
  certs: Certification[] = [];
  loading = false;
  error = '';
  editMode = false;
  editForm: Partial<Device> = {};
  showCertForm = false;

  certForm: Certification = {
    name: '',
    standard: '',
    expiryDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private devicesApi: DeviceService,
    private certApi: CertificationService
  ) {}

  ngOnInit(): void {
    this.deviceId = Number(this.route.snapshot.paramMap.get('id'));
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';

    this.devicesApi.get(this.deviceId).subscribe({
      next: (d) => {
        this.device = d;
        this.editForm = { ...d };
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load device';
        this.loading = false;
      },
    });

    this.certApi.listForDevice(this.deviceId).subscribe({
      next: (c) => (this.certs = c),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load certifications'),
    });
  }

  saveEdit(): void {
    this.error = '';
    this.devicesApi.update(this.deviceId, this.editForm).subscribe({
      next: (d) => {
        this.device = d;
        this.editMode = false;
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to update device'),
    });
  }

  cancelEdit(): void {
    this.editForm = { ...this.device };
    this.editMode = false;
  }

  addCert(): void {
    this.error = '';
    this.certApi.createForDevice(this.deviceId, this.certForm).subscribe({
      next: () => {
        this.certForm = { name: '', standard: '', expiryDate: '' };
        this.showCertForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to add certification'),
    });
  }

  deleteCert(c: Certification): void {
    if (c.id == null) return;
    this.error = '';
    this.certApi.delete(c.id).subscribe({
      next: () => this.load(),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to delete certification'),
    });
  }

  statusClass(status: string): string {
    return status === 'ACTIVE'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  }
}
