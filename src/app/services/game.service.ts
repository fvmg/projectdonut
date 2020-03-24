import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl = environment.apiEndpoint + '/games';

  constructor(private http: HttpClient) { }

  getGameList() {
    return this.http.get(this.baseUrl + '/getAll');
  }

  getGame(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/get?id=' + id);
  }

  saveGame(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/createGame', formData);
  }

  rateGame(rateData): Observable<any> {
    return this.http.post(this.baseUrl + '/rateGame', rateData);
  }
}
