import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../../services/device';
import { CertificationService } from '../../services/certification';
import { Device } from '../../models/device';
import { Certification } from '../../models/certification';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.css',
})
export class DeviceDetail implements OnInit {
  deviceId!: number;

  device?: Device;
  certs: Certification[] = [];
  error = '';

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
    this.error = '';

    this.devicesApi.get(this.deviceId).subscribe({
      next: (d) => (this.device = d),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load device'),
    });

    this.certApi.listForDevice(this.deviceId).subscribe({
      next: (c) => (this.certs = c),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load certifications'),
    });
  }

  addCert(): void {
    this.error = '';
    this.certApi.createForDevice(this.deviceId, this.certForm).subscribe({
      next: () => {
        this.certForm = { name: '', standard: '', expiryDate: '' };
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
}
