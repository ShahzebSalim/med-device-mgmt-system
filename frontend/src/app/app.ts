import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockAuthService } from './services/mock-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App implements OnInit {
  /** * Injecting the MockAuthService and Router engine. 
   * Declaring it as 'public' ensures the HTML template can access 
   * auth.currentRole, auth.isAdmin, etc.
   */
  public auth = inject(MockAuthService);
  private router = inject(Router);

  ngOnInit() {
    // 1. Force the active profile dropdown to select 'Admin' on application launch
    this.auth.setRole('Admin');
    
    // 2. Guide the initial view layout straight onto the dashboard screen
    this.router.navigate(['/dashboard']);
  }

  /**
   * Triggered when the user selects a different role from the top-right dropdown.
   */
  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRole = selectElement.value;
    
    // Update the service global profile value
    this.auth.setRole(selectedRole);

    // Enforce dynamic navigation logic based on the newly selected profile role
    this.enforceRoleNavigation(selectedRole);
  }

  /**
   * Evaluates permissions in real time on dropdown switch and routes unauthorized traffic away.
   */
  private enforceRoleNavigation(role: string) {
    const currentUrl = this.router.url;

    if (role === 'Quality Manager') {
      // Quality Managers are restricted from the Dashboard, Personnel, and Teams lists
      if (currentUrl.includes('/dashboard') || currentUrl.includes('/personnel') || currentUrl.includes('/teams')) {
        this.router.navigate(['/devices']);
      }
    } 
    else if (role === 'Business Executive') {
      // Executives belong on the Dashboard, but are restricted from Personnel/Teams management
      if (currentUrl.includes('/personnel') || currentUrl.includes('/teams')) {
        this.router.navigate(['/dashboard']);
      }
    }
    else if (role === 'Admin') {
      // System Admins have clearance for all routes, no forced redirects needed on toggle
    }
  }
}