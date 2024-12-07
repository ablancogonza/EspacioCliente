import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { EstadoService } from '../shared/estado/estado.service';


export const adminGuard: CanActivateFn = (route, state) => { 
  const estadoService = inject(EstadoService);
  const router = inject(Router);
  const token = estadoService.sesion?.getToken() ?? '';
  if (token === '') return router.navigateByUrl('/login');
  if (estadoService.sesion?.getRol() !== 1) return router.navigateByUrl('/login')
  return true;
};
