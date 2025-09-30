import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'https://crosspay.onrender.com/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  // Observable que otros componentes pueden suscribirse
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(user: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { user, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  checkAuthStatus(): void {
    this.isAuthenticatedSubject.next(this.hasToken());
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
