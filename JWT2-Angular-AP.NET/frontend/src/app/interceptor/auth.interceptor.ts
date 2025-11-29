import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/authServices/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Lấy access token từ localStorage
  const token = authService.getAccessToken();

  // Clone request và thêm Authorization header nếu có token
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true // Quan trọng: gửi cookie cùng request
    });
  } else if (req.url.includes('/api/')) {
    // Các request tới API cần withCredentials để gửi cookie
    authReq = req.clone({
      withCredentials: true
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // Xử lý lỗi 401 Unauthorized
      if (error.status === 401) {
        // Nếu không phải request refresh-token, thử refresh token
        if (!req.url.includes('/refresh-token')) {
          return authService.refreshToken().pipe(
            switchMap(() => {
              // Sau khi refresh thành công, retry request với token mới
              const newToken = authService.getAccessToken();
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                },
                withCredentials: true
              });
              return next(retryReq);
            }),
            catchError((refreshError) => {
              // Nếu refresh token thất bại, logout và redirect
              authService.logout().subscribe();
              router.navigate(['/signin']);
              return throwError(() => refreshError);
            })
          );
        } else {
          // Nếu refresh-token bị lỗi 401, logout
          authService.logout().subscribe();
          router.navigate(['/signin']);
        }
      }

      // Xử lý lỗi 403 Forbidden
      if (error.status === 403) {
        router.navigate(['/home']);
      }

      return throwError(() => error);
    })
  );
};
