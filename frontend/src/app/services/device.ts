import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../models/device';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  private base = '/api/devices';

  constructor(private http: HttpClient) {}

  list(): Observable<Device[]> {
    return this.http.get<Device[]>(this.base);
  }

  get(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.base}/${id}`);
  }

  create(device: Partial<Device>): Observable<Device> {
    return this.http.post<Device>(this.base, device);
  }

  update(id: number, device: Partial<Device>): Observable<Device> {
    return this.http.put<Device>(`${this.base}/${id}`, device);
  }
}
