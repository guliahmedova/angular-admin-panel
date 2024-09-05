import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/resuable/alert/alert.component';
import { ILogin, ILoginResponse } from '../../model/interface/login';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, AlertComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: ILogin = {
    email: '',
    password: '',
  };

  userSerive = inject(UserService);

  alertType: string = '';
  alertText: string = '';

  router = inject(Router);

  login() {
    this.userSerive.login(this.loginObj).subscribe(
      (res: ILoginResponse) => {
        localStorage.setItem('access-token', res.access_token);
        this.router.navigateByUrl('user-list');
      },
      (error) => {
        this.alertType = 'alert-danger';
        this.alertText = 'Email or password are incorrect!';
      }
    );
  }
}
