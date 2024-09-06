import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../model/class/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  userService = inject(UserService);
  router = inject(Router);

  user: User = new User();
  errors: string[] = [];

  createUser() {
    this.userService.addUser(this.user).subscribe(
      (res: User) => {
        this.user = new User();
        this.router.navigateByUrl('/user-list');
      },
      (error) => {
        this.errors = error?.error?.message;
        console.log(error?.error?.message, 'ERRRRROR');
      }
    );
  }

  updateUser() {
    if (this.user.id) {
      this.userService.updateUser(this.user).subscribe(
        (res: User) => {
          this.router.navigateByUrl('/user-list');
        },
        (error) => {
          this.errors = error?.error?.message;
          console.log(error?.error?.message, 'ERRRRROR');
        }
      );
    }
  }
}
