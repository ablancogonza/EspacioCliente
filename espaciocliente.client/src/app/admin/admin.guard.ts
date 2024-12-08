import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { EstadoService } from '../shared/estado/estado.service';
import { Rol } from '../shared/enumerados/rol';


export const adminGuard: CanActivateFn = (route, state) => {

  const estadoService = inject(EstadoService);
  const router = inject(Router);
  const token = estadoService.sesion?.getToken() ?? '';
  if (token === '') return router.navigateByUrl('/login');
  if (estadoService.sesion?.getRol() !== Rol.admin) return false;
  return true;
};
