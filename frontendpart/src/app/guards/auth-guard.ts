import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Direct check from localStorage, don't use service methods
    const token = localStorage.getItem('token');
    
    console.log('=== AuthGuard Check ===');
    console.log('Direct localStorage token:', token ? 'EXISTS' : 'MISSING');
    console.log('URL:', state.url);
    console.log('=======================');
    
    if (token) {
      console.log('✓ Access GRANTED');
      return true;
    }
    
    console.log('✗ Access DENIED - Redirecting to login');
    this.router.navigate(['/login']);
    return false;
  }
}