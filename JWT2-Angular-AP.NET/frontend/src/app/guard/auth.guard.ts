import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/authServices/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Lưu URL người dùng muốn truy cập để redirect sau khi đăng nhập
  router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
  return false;
};
