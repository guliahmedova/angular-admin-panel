import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user-list',
        component: UserListComponent,
      },
      {
        path: 'update-user/:id',
        component: UpdateUserComponent,
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
      },
    ],
  },
];
