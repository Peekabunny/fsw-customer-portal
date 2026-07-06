import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = 'https://localhost:7227';

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // ========== CREATE TICKET ==========
  createTicket(ticket: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Troubleshooting/create`,
      ticket,
      { headers: this.getHeaders() }
    );
  }

  // ========== GET MY TICKETS ==========
  getMyTickets(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Troubleshooting`,
      { headers: this.getHeaders() }
    );
  }
}