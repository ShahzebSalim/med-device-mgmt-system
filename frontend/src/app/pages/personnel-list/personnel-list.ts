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
  loading = false;
  showForm = false;
  search = '';

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
    this.loading = true;
    this.api.list().subscribe({
      next: (p) => {
        this.personnel = p;
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load personnel';
        this.loading = false;
      },
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
        this.showForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error ?? e?.error?.message ?? 'Failed to create personnel'),
    });
  }

  get filtered(): Personnel[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.personnel;
    return this.personnel.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.role ?? '').toLowerCase().includes(q) ||
        (p.email ?? '').toLowerCase().includes(q)
    );
  }

  teamName(teamId?: number | null): string {
    if (teamId == null) return '—';
    return this.teams.find((t) => t.id === teamId)?.name ?? String(teamId);
  }

  roleClass(role?: string): string {
    if (role === 'ADMIN') return 'bg-purple-100 text-purple-800';
    if (role === 'MANAGER') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-700';
  }

  initials(name: string): string {
    return name
      .split(' ')
      .filter((w) => w.length > 0)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
}
