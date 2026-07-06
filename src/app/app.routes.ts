import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { MyTickets } from './components/my-tickets/my-tickets';
import { SubmitTicket } from './components/submit-ticket/submit-ticket';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }
  return router.navigate(['/login']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'my-tickets', component: MyTickets, canActivate: [authGuard] },
  { path: 'submit-ticket', component: SubmitTicket, canActivate: [authGuard]},
];