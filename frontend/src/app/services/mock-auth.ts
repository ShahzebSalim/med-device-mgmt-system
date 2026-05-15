import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Define the roles to match the dropdown values exactly
export type UserRole = 'Admin' | 'Quality Manager' | 'Business Executive';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  private roleSubject = new BehaviorSubject<UserRole>('Quality Manager');
  currentRole$ = this.roleSubject.asObservable();

  setRole(role: string) {
    console.log('Switching Role to:', role); // DEBUG: Check your console!
    this.roleSubject.next(role as UserRole);
  }

  get currentRole(): UserRole {
    return this.roleSubject.value;
  }

  // Use lowercase comparison to avoid casing errors
  get isAdmin(): boolean { 
    return this.currentRole === 'Admin'; 
  }
  
  get isQualityManager(): boolean { 
    return this.currentRole === 'Quality Manager'; 
  }
  
  get isExecutive(): boolean { 
    return this.currentRole === 'Business Executive'; 
  }
}