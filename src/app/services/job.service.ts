import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = environment.apiEndpoint + '/jobs';

  constructor(private http: HttpClient) { }

  getJobList(gameId) {
    return this.http.get(this.baseUrl + '/getAll?gameId=' + gameId);
  }

  getJob(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/get?id=' + id);
  }

  saveJob(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/createJob', formData);
  }
}
