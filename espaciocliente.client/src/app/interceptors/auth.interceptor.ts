import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { EstadoService } from '../servicios/estado.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const estadoService = inject(EstadoService);
  const token = estadoService.sesion?.getToken()??'';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
