import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { enpoint } from '../constant/endpoint';
import { User } from '../model/class/user';
import { ILogin, ILoginResponse } from '../model/interface/login';
import { IUser } from '../model/interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(obj: ILogin): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      environment.API_URL + enpoint.API_METHOD.LOGIN,
      obj
    );
  }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      environment.API_URL + enpoint.API_METHOD.ADDGET_USER
    );
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(
      environment.API_URL + enpoint.API_METHOD.ADDGET_USER + '/' + userId
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(
      environment.API_URL + enpoint.API_METHOD.ADDGET_USER,
      user
    );
  }

  updateUser(user: User, userId: string): Observable<User> {
    return this.http.put<User>(
      environment.API_URL + enpoint.API_METHOD.ADDGET_USER + '/' + userId,
      user
    );
  }

  deleteUser(userId: number) {
    return this.http.delete(
      environment.API_URL + enpoint.API_METHOD.ADDGET_USER + '/' + userId
    );
  }

  getUserBySession(): Observable<IUser> {
    const access_token = localStorage.getItem('access-token');

    return this.http.get<IUser>(
      'https://api.escuelajs.co/api/v1/auth/profile',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }
}
