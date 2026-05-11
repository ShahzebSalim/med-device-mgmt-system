import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Certification } from '../models/certification';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CertificationService {
  constructor(private http: HttpClient) {}

  listForDevice(deviceId: number): Observable<Certification[]> {
return this.http.get<Certification[]>(`/mdms-backend/api/devices/${deviceId}/certifications`);  }

  createForDevice(deviceId: number, cert: Certification): Observable<Certification> {
return this.http.post<Certification>(`/mdms-backend/api/devices/${deviceId}/certifications`, cert);  }

  delete(certId: number): Observable<void> {
return this.http.delete<void>(`/mdms-backend/api/certifications/${certId}`);  }
}
