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
  filtered: Personnel[] = [];
  teams: Team[] = [];
  loading = false;
  error = '';
  search = '';
  showForm = false;

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
    this.loading = true;
    this.error = '';
    this.api.list().subscribe({
      next: (p) => {
        this.personnel = p;
        this.applySearch();
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load personnel';
        this.loading = false;
      },
    });
  }

  applySearch(): void {
    const q = this.search.toLowerCase();
    this.filtered = q
      ? this.personnel.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            (p.role ?? '').toLowerCase().includes(q) ||
            (p.email ?? '').toLowerCase().includes(q)
        )
      : [...this.personnel];
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
        this.showForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error ?? e?.error?.message ?? 'Failed to create personnel'),
    });
  }

  teamName(id?: number | null): string {
    if (id == null) return '—';
    return this.teams.find((t) => t.id === id)?.name ?? String(id);
  }

  roleClass(role?: string): string {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-800';
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }
}
