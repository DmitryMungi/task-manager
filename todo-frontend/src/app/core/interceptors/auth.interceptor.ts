import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Если есть токен — клонируем и добавляем заголовок
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      // Если токен протух — попытка обновить
      if (
        err.status === 401 &&
        authService.getRefreshToken() &&
        !req.url.includes('/login') &&
        !req.url.includes('/register') &&
        !req.url.includes('/refresh')
      ) {
        return authService.refreshToken().pipe(
          switchMap((refreshResponse) => {
            // сохраняем новый access token
            localStorage.setItem('auth_token', refreshResponse.token);

            // повторяем оригинальный запрос уже с новым токеном
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${refreshResponse.token}`
              }
            });

            return next(retryReq);
          }),
          catchError(refreshErr => {
            // Если refresh тоже не сработал → logout
            authService.logout();
            return throwError(() => refreshErr);
          })
        );
      }

      return throwError(() => err);
    })
  );
};
