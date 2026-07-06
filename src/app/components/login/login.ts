import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

  userName = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    // if already logged in skip the login page
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/my-tickets']);
    }
  }

  onLogin() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.userName, this.password).subscribe({
      next: (token) => {
        this.authService.saveToken(token);
        this.router.navigate(['/my-tickets']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        this.isLoading = false;
      }
    });
  }
}