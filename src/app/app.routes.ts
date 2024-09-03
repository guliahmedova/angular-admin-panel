import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ApplicationListComponent } from './pages/application-list/application-list.component';
import { LoanApplicationComponent } from './pages/loan-application/loan-application.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'newApplication',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'newApplication',
        component: LoanApplicationComponent,
      },
      {
        path: 'applicationList',
        component: ApplicationListComponent,
      },
    ],
  },
];
