import { Routes } from '@angular/router';

export const INCOMES_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/incomes').then((m) => m.Incomes),
  },
];
