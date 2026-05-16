import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../models/personnel';

@Injectable({ providedIn: 'root' })
export class PersonnelService {
  private base = '/mdms-backend/api/personnel';

  constructor(private http: HttpClient) {}

  list(): Observable<Personnel[]> {
    return this.http.get<Personnel[]>(this.base);
  }

  create(p: Partial<Personnel>): Observable<Personnel> {
    return this.http.post<Personnel>(this.base, p);
  }

  // --- NEW UPDATE METHOD ---
  update(id: number, p: Partial<Personnel>): Observable<Personnel> {
    return this.http.put<Personnel>(`${this.base}/${id}`, p);
  }

  // --- NEW DELETE METHOD ---
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}