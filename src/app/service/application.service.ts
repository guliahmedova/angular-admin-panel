import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { enpoint } from '../constant/endpoint';
import { Application } from '../model/class/application';
import { Observable } from 'rxjs';
import { IResponse } from '../model/interface/response';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  addNewApplication(obj: Application): Observable<IResponse> {
    return this.http.post<IResponse>(
      environment.API_URL_PROJECT + enpoint.API_METHOD.ADD_APPLICATION,
      obj
    );
  }

  getAllApplication(): Observable<IResponse> {
    return this.http.get<IResponse>(
      environment.API_URL_PROJECT + enpoint.API_METHOD.GET_APPLICATIONS
    );
  }
}