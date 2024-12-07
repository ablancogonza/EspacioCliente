import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { autenticadoGuard } from './auth/autenticado.guard';
import { LoginComponent } from './auth/login/login.component';
//import { PrincipalComponent } from './principal/principal.component';
import { adminGuard } from './admin/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'principal',
    loadComponent: () => import('./principal/principal.component').
      then(m => m.PrincipalComponent),
      canActivate: [autenticadoGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin/admin.component').
      then(m => m.AdminComponent),
    canActivate: [adminGuard]
  },
  { path: '**', redirectTo: 'principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
