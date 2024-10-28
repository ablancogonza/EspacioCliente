import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EstadoService } from '../servicios/estado.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const estadoService = inject(EstadoService);
  const router = inject(Router);
  const token = estadoService.sesion?.getToken()??'';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        estadoService.cerrarSesion();
        router.navigateByUrl('/login');
      }
      return throwError(() => error);
    })
  );
};
