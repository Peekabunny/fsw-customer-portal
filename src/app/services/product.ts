import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7227';

  constructor(
    private http: HttpClient,
    private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  // ========== GET MY PRODUCTS ==========
  // no customerId param needed - backend identifies the
  // logged-in customer from their JWT and scopes automatically
  getMyProducts(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/Product`,
      { headers: this.getHeaders() }
    );
  }
}