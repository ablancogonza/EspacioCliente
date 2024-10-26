import { CanActivateFn, Router } from '@angular/router';
import { EstadoService } from '../servicios/estado.service';
import { inject } from '@angular/core';


export const autenticadoGuard: CanActivateFn = (route, state) => { 
  const estadoService = inject(EstadoService);
  const router = inject(Router);
  const token = estadoService.sesion?.getToken() ?? '';
  if (token === '') return router.navigateByUrl('/login');
  return true;
};
