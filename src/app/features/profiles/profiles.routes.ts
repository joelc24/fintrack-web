import { Routes } from '@angular/router';

export const PROFILES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/profiles').then((m) => m.Profiles),
  },
];
