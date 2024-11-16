import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { EstadoService } from '../shared/estado/estado.service';


export const autenticadoGuard: CanActivateFn = (route, state) => { 
  const estadoService = inject(EstadoService);
  const router = inject(Router);
  const token = estadoService.sesion?.getToken() ?? '';
  if (token === '') return router.navigateByUrl('/login');
  return true;
};
