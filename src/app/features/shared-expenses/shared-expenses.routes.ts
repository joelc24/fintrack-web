import { Routes } from '@angular/router';

export const SHARED_EXPENSES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/shared-expenses').then((m) => m.SharedExpenses),
  },
];
