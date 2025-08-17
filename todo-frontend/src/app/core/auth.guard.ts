import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard: CanActivateFn = (): boolean => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.hasToken()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};