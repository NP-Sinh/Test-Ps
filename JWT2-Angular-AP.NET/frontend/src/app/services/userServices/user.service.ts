import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
  isActive: boolean;
}

export interface UserWithTokens extends UserProfile {
  refreshTokensCount: number;
}

export interface ApiResponse<T> {
  statuscodes: number;
  message: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(
      `${this.apiUrl}/User/profile`
    );
  }

  getAllUsers(): Observable<ApiResponse<UserWithTokens[]>> {
    return this.http.get<ApiResponse<UserWithTokens[]>>(
      `${this.apiUrl}/User/admin/all-user`
    );
  }
}
