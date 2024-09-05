import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../model/interface/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  userService = inject(UserService);
  isAdmin: boolean = false;

  ngOnInit(): void {
    this.getUserBySessionOnLoad();
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((res: IUser[]) => {
      if (this.isAdmin) {
        this.users = res;
      } else {
        this.users = res?.filter(
          (user: IUser) => user.role.toLowerCase() != 'admin'
        );
      }
    });
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

  getUserBySessionOnLoad() {
    this.userService.getUserBySession().subscribe(
      (res: IUser) => {
        console.log('res: ', res);
        if (res.role.toLowerCase() === 'admin') {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
