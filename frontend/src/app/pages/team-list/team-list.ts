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
        this.error = ''; // <-- FIX: Clears the error state successfully on load
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
        this.error = ''; // <-- FIX: Clears the error state successfully on create
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create team'),
    });
  }
}