import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'perfiles',
    loadChildren: () => import('./features/profiles/profiles.routes').then((m) => m.PROFILES_ROUTES),
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'ingresos',
        loadChildren: () => import('./features/incomes/incomes.routes').then((m) => m.INCOMES_ROUTES),
      },
      {
        path: 'gastos',
        loadChildren: () => import('./features/expenses/expenses.routes').then((m) => m.EXPENSES_ROUTES),
      },
      {
        path: 'gastos-compartidos',
        loadChildren: () =>
          import('./features/shared-expenses/shared-expenses.routes').then((m) => m.SHARED_EXPENSES_ROUTES),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
