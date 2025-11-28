import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Thử refresh token trước khi redirect
      return this.authService.refreshToken().pipe(
        map((response: any) => {
          if (response.statuscodes === 200) {
            return true;
          } else {
            this.router.navigate(['/signin']);
            return false;
          }
        }),
        catchError(() => {
          this.router.navigate(['/signin']);
          return of(false);
        })
      );
    }
  }
}
