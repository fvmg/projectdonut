import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiEndpoint + '/user';

  constructor(private http: HttpClient) { }

  login(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/login', formData);
  }

  register(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/register', formData);
  }

  checkToken(tokenData): Observable<any> {
    return this.http.post(this.baseUrl + '/checkToken', tokenData);
  }
}
