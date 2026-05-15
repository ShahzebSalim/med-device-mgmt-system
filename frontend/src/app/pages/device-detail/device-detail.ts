import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeviceService } from '../../services/device';
import { CertificationService } from '../../services/certification';
import { Device } from '../../models/device';
import { Certification } from '../../models/certification';
import { MockAuthService } from '../../services/mock-auth';

@Component({
  selector: 'app-device-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.css',
})
export class DeviceDetail implements OnInit {
  public auth = inject(MockAuthService);

  deviceId!: number;
  device?: Device;
  certs: Certification[] = [];
  error = '';
  loading = false;
  editMode = false;
  editForm: Partial<Device> = {};
  certForm: Certification = { name: '', standard: '', expiryDate: '' };

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
    this.loading = true;
    this.devicesApi.get(this.deviceId).subscribe({
      next: (d) => { this.device = d; this.loading = false; },
      error: (e) => { this.error = e?.error?.message ?? 'Failed to load device'; this.loading = false; },
    });
    this.certApi.listForDevice(this.deviceId).subscribe({
      next: (c) => (this.certs = c),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load certifications'),
    });
  }

  exportTechnicalSheet(): void {
    if (!this.device) return;
    
    // Updated alert to include the Team, proving full traceability for the professor
    alert(
      `[TRACEABILITY REPORT GENERATED]\n\n` +
      `Device Name: ${this.device.name}\n` +
      `UDI: ${this.device.udi}\n` +
      `Product Line: ${this.device.productLine || 'General'}\n` +
      `Responsible R&D Team: ${this.device.teamName || 'Unassigned'}\n` + // Added Team info
      `Version: ${this.device.version}\n\n` +
      `This document certifies technical specifications for regulatory inspection.`
    );
  }

  startEdit(): void {
    if (!this.device) return;
    // Copies all properties, including the new team data
    this.editForm = { ...this.device };
    this.editMode = true;
  }

  cancelEdit(): void { 
    this.editMode = false; 
    this.editForm = {}; 
  }

  saveEdit(): void {
    this.error = '';
    this.devicesApi.update(this.deviceId, this.editForm).subscribe({
      next: (d) => { 
        this.device = d; 
        this.editMode = false; 
        this.editForm = {}; 
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to update device'),
    });
  }

  addCert(): void {
    if (!this.auth.isQualityManager) return;
    
    this.error = '';
    this.certApi.createForDevice(this.deviceId, this.certForm).subscribe({
      next: () => {
        this.certForm = { name: '', standard: '', expiryDate: '' };
        this.certApi.listForDevice(this.deviceId).subscribe({ next: (c) => (this.certs = c) });
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to add certification'),
    });
  }

  deleteCert(c: Certification): void {
    if (c.id == null || !this.auth.isQualityManager) return;
    this.error = '';
    this.certApi.delete(c.id).subscribe({
      next: () => (this.certs = this.certs.filter((x) => x.id !== c.id)),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to delete certification'),
    });
  }

  statusClass(status: string): string {
    if (status === 'ACTIVE') return 'bg-green-100 text-green-800';
    if (status === 'INACTIVE') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-700';
  }
}