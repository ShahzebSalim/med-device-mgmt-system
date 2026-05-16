import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/team';
import { Team } from '../../models/team';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-list.html',
  styleUrl: './team-list.css',
})
export class TeamList implements OnInit {
  teams: Team[] = [];
  error = '';
  loading = false;
  showForm = false;

  // Track the card editing state
  editingId: number | null = null;
  editForm: Partial<Team> = { name: '', description: '' };

  form: Partial<Team> = {
    name: '',
    description: '',
  };

  constructor(private api: TeamService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.error = '';
    this.loading = true;
    this.api.list().subscribe({
      next: (t) => {
        this.teams = t;
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.error?.message ?? 'Failed to load teams';
        this.loading = false;
      },
    });
  }

  create(): void {
    this.error = '';
    this.api.create(this.form).subscribe({
      next: () => {
        this.form = { name: '', description: '' };
        this.showForm = false;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create team'),
    });
  }

  // --- NEW CRUD METHODS ---
  startEdit(t: Team): void {
    if (t.id == null) return;
    this.editingId = t.id;
    this.editForm = { name: t.name, description: t.description };
  }

  cancelEdit(): void {
    this.editingId = null;
  }

  saveEdit(id: number): void {
    this.error = '';
    this.api.update(id, this.editForm).subscribe({
      next: () => {
        this.editingId = null;
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to update team'),
    });
  }

  deleteTeam(id: number | undefined): void {
    if (!id) return;
    if (confirm('Are you sure you want to delete this engineering team?')) {
      this.error = '';
      this.api.delete(id).subscribe({
        next: () => this.load(),
        error: (e) => {
          // This elegantly displays your backend rule validation messages
          this.error = e?.error?.message ?? 'Failed to delete team. Ensure no personnel are linked.';
        },
      });
    }
  }
}