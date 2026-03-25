import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';

@Injectable({ providedIn: 'root' })
export class TeamService {
  private base = '/api/teams';

  constructor(private http: HttpClient) {}

  list(): Observable<Team[]> {
    return this.http.get<Team[]>(this.base);
  }

  create(t: Partial<Team>): Observable<Team> {
    return this.http.post<Team>(this.base, t);
  }
}
