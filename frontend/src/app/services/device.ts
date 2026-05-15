import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  // Ensure this base path matches your Jakarta EE server configuration
  private base = '/mdms-backend/api/devices';
  
  constructor(private http: HttpClient) {}

  /**
   * Retrieves the centralized catalogue of medical devices.
   * This satisfies the requirement for a structured digital registry.
   */
  list(): Observable<Device[]> {
    return this.http.get<Device[]>(this.base);
  }

  /**
   * Fetches detailed specifications for a specific device, 
   * including its responsible R&D team and certifications.
   */
  get(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.base}/${id}`);
  }

  /**
   * Creates a new medical device and links it to an Engineering Team.
   * This provides the "operational traceability" sought by the enterprise.
   */
  create(device: Partial<Device>): Observable<Device> {
    // The device object now includes teamId from the creation form
    return this.http.post<Device>(this.base, device);
  }

  /**
   * Updates existing device technical specs or changes the responsible team.
   */
  update(id: number, device: Partial<Device>): Observable<Device> {
    return this.http.put<Device>(`${this.base}/${id}`, device);
  }

  /**
   * Permanently removes a device record from the digital registry.
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}