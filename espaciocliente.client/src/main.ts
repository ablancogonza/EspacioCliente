import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { LOCALE_ID, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptor } from './app/auth/auth.interceptor';




bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, BrowserAnimationsModule),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: "es-ES" },
  ],
}).catch(err => console.error('boostrapApplication: ', err));
