import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../model/class/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  userService = inject(UserService);
  user: User = new User();
  router = inject(Router);
  error: string = '';
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((res) => {
        this.user = res;
      });
    }
  }

  updateUser() {
    if (this.userId) {
      this.userService.updateUser(this.user, this.userId).subscribe(
        (res: User) => {
          this.router.navigateByUrl('/user-list');
        },
        (error) => {
          this.error = error?.error?.message;
        }
      );
    }
  }
}
