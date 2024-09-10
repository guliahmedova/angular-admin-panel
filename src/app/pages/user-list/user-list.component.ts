import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../model/interface/user';
import { UserService } from '../../service/user.service';
import { SpinnerComponent } from '../../components/resuable/spinner/spinner.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, SpinnerComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  userService = inject(UserService);
  isAdmin: boolean = false;
  isDisplayed: boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role?.toUpperCase() == 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
    this.loadUsers();
  }

  loadUsers() {
    this.isDisplayed = true;
    this.userService.getAllUsers().subscribe(
      (res: IUser[]) => {
        if (this.isAdmin) {
          this.users = res;
        } else {
          this.users = res?.filter(
            (user: IUser) => user.role.toLowerCase() != 'admin'
          );
        }
        this.isDisplayed = false;
      },
      (error) => {
        this.isDisplayed = false;
      }
    );
  }

  deleteUser(userId: number) {
    const isDelete = confirm('Are u sure delete the user?');
    if (isDelete) {
      this.userService.deleteUser(userId).subscribe(
        (res: any) => {
          this.loadUsers();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
