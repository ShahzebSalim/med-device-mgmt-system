import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../models/certification';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  constructor(private http: HttpClient) {}

  listForDevice(deviceId: number): Observable<Certification[]> {
    return this.http.get<Certification[]>(`/api/devices/${deviceId}/certifications`);
  }

  createForDevice(deviceId: number, cert: Certification): Observable<Certification> {
    return this.http.post<Certification>(`/api/devices/${deviceId}/certifications`, cert);
  }

  delete(certId: number): Observable<void> {
    return this.http.delete<void>(`/api/certifications/${certId}`);
  }
}
