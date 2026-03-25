import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonnelService } from '../../services/personnel';
import { TeamService } from '../../services/team';
import { Personnel } from '../../models/personnel';
import { Team } from '../../models/team';

@Component({
  selector: 'app-personnel-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personnel-list.html',
  styleUrl: './personnel-list.css',
})
export class PersonnelList implements OnInit {
  personnel: Personnel[] = [];
  teams: Team[] = [];
  error = '';

  // MUST match backend enum exactly
  roles = ['ADMIN', 'MANAGER', 'STANDARD_USER'];

  form: any = {
    name: '',
    role: 'STANDARD_USER',
    email: '',
    teamId: null as number | null,
  };

  constructor(private api: PersonnelService, private teamsApi: TeamService) {}

  ngOnInit(): void {
    this.load();
    this.loadTeams();
  }

  loadTeams(): void {
    this.teamsApi.list().subscribe({
      next: (t) => (this.teams = t),
      error: () => {},
    });
  }

  load(): void {
    this.error = '';
    this.api.list().subscribe({
      next: (p) => (this.personnel = p),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load personnel'),
    });
  }

  create(): void {
    this.error = '';
    const payload: Partial<Personnel> = {
      name: this.form.name,
      role: this.form.role,
      email: this.form.email,
      teamId: this.form.teamId ? Number(this.form.teamId) : null,
    };

    this.api.create(payload).subscribe({
      next: () => {
        this.form = { name: '', role: 'STANDARD_USER', email: '', teamId: null };
        this.load();
      },
      error: (e) => (this.error = e?.error ?? e?.error?.message ?? 'Failed to create personnel'),
    });
  }
}
