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
    this.api.list().subscribe({
      next: (t) => (this.teams = t),
      error: (e) => (this.error = e?.error?.message ?? 'Failed to load teams'),
    });
  }

  create(): void {
    this.error = '';
    this.api.create(this.form).subscribe({
      next: () => {
        this.form = { name: '', description: '' };
        this.load();
      },
      error: (e) => (this.error = e?.error?.message ?? 'Failed to create team'),
    });
  }
}
