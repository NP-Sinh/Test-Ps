import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface SignInResponse {
  statuscodes: number;
  message: string;
  data?: {
    accessToken: string;
    accessTokenExpiry: Date;
    user: User;
  };
}

export interface RefreshTokenResponse {
  statuscodes: number;
  message: string;
  data?: {
    accessToken: string;
    accessTokenExpiry: Date;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        this.currentUserSubject.next(user);
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  signIn(username: string, password: string): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        `${this.apiUrl}/Auth/signin`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          if (response.statuscodes === 200 && response.data) {
            // Lưu access token
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem(
              'accessTokenExpiry',
              response.data.accessTokenExpiry.toString()
            );

            // Lưu user info
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.data.user)
            );
            this.currentUserSubject.next(response.data.user);
          }
        }),
        catchError((error) => {
          console.error('Sign in error:', error);
          return throwError(() => error);
        })
      );
  }

  signUp(userData: {
    username: string;
    email: string;
    passwordHash: string;
    fullName: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Auth/signup`, userData);
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    return this.http
      .post<RefreshTokenResponse>(
        `${this.apiUrl}/Auth/refresh-token`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          if (response.statuscodes === 200 && response.data) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem(
              'accessTokenExpiry',
              response.data.accessTokenExpiry.toString()
            );
          }
        }),
        catchError((error) => {
          this.clearStorage();
          return throwError(() => error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/Auth/logout`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap(() => {
          this.clearStorage();
        }),
        catchError((error) => {
          // Vẫn clear storage dù có lỗi
          this.clearStorage();
          return throwError(() => error);
        })
      );
  }

  private clearStorage(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpiry');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
