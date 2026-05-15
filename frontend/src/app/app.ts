import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MockAuthService } from './services/mock-auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  /** * Injecting the MockAuthService. 
   * Declaring it as 'public' ensures the HTML template can access 
   * auth.currentRole, auth.isAdmin, etc.
   */
  public auth = inject(MockAuthService);

  /**
   * Triggered when the user selects a different role from the top-right dropdown.
   * This updates the global state across the entire application.
   */
  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedRole = selectElement.value;
    
    // Update the service with the new role string ('Admin', 'Quality Manager', etc.)
    this.auth.setRole(selectedRole);
  }
}