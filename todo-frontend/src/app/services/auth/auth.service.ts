import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, Observable } from 'rxjs';

import { AuthCredentials, AuthResponse } from '../../types/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  public isAuthenticated$ = new BehaviorSubject<boolean>(this.hasToken());

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  public register(data: { username: string, password: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, data).pipe(
      tap(() => {
        localStorage.setItem('username', data.username);
      })
    );
  }

  public login(data: AuthCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response: AuthResponse): void => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
        localStorage.setItem('username', data.username);
        this.isAuthenticated$.next(true);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.isAuthenticated$.next(false);
    this.router.navigate(['/login']);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  public refreshToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/refresh`, {
      refreshToken: this.getRefreshToken()
    });
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}
