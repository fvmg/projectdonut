import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = environment.apiEndpoint + '/genres';

  constructor(private http: HttpClient) { }

  getAllBase() {
    return this.http.get(this.baseUrl + '/getAllBase');
  }
}
