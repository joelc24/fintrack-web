import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login').then((m) => m.Login),
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/register').then((m) => m.Register),
  },
];
