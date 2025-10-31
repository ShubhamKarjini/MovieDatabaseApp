import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent {
  username = '';
  email = '';
  password = '';
  error = '';
  loading = false;
  isLoginMode = true;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/movies']);
      },
      error => {
        this.error = error.error.message || 'Login failed';
        this.loading = false;
      }
    );
  }

  register(): void {
    this.loading = true;
    this.authService.register(this.username, this.email, this.password).subscribe(
      () => {
        this.error = '';
        this.isLoginMode = true;
        alert('Registration successful! Please login.');
        this.resetForm();
      },
      error => {
        this.error = error.error.message || 'Registration failed';
        this.loading = false;
      }
    );
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}