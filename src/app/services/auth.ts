import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'https://localhost:7227';

  // injects an instance of HTTpClient 
  constructor(private http: HttpClient) {}

  // Sending a login request to the backend
  login(userName: string, password: string): Observable<string>{
    return this.http.post(
      `${this.apiUrl}/Account/Login`,
      { userName, password },
      { responseType: 'text' as const }
    );
  }

  // Creates new customer where data is the customer information
   registerCustomer(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Account/RegisterCustomer`,
      data, 
      { responseType: 'text' as const}
    );
  }


    // Stores the authentication token locally
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Retrieves the saved token from the browser
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Checks whether a user is considered logged in.
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Deletes the token from the browser when log out 
  logout(): void {
    localStorage.removeItem('token');
  }
}
