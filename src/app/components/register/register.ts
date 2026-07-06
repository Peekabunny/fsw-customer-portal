import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {


  userName = '';
  email = '';
  password = '';
  name = '';
  phone = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.registerCustomer({
      userName: this.userName,
      email: this.email,
      password: this.password,
      name: this.name,
      phone: this.phone
    }).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = 'Account created! Redirecting to login...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.detail || 'Registration failed. Please check your information and try again.';
      }
    });
  }


}
