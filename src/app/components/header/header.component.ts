import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/class/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  router = inject(Router);
  userService = inject(UserService);
  user: User = new User();

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.userService.getUserBySession().subscribe((res) => {
      this.user = res;
    });
  }
}
