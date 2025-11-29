export interface LoginRequest {
  username: string;
  password: string;
}

export interface SignUpRequest {
  username: string;
  email: string;
  passwordHash: string;
  fullName?: string;
}

export interface ApiResponse<T = any> {
  statuscodes: number;
  message: string;
  data?: T;
}

export interface AuthResponse {
  accessToken: string;
  accessTokenExpiry: Date;
  user: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  accessTokenExpiry: Date;
}
