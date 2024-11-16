import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { autenticadoGuard } from './auth/autenticado.guard';
import { LoginComponent } from './auth/login/login.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent, canActivate: [autenticadoGuard] },
  { path: '**', redirectTo: 'principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
