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

  getComments(gameId) {
    return this.http.get(this.baseUrl + '/getComments?gameId=' + gameId);
  }

  getImages(gameId) {
    return this.http.get(this.baseUrl + '/getImages?gameId=' + gameId);
  }

  getFollowers(gameId) {
    return this.http.get(this.baseUrl + '/getFollowers?gameId=' + gameId);
  }

  getGame(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/get?id=' + id);
  }

  saveGame(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/createGame', formData);
  }

  addImage(formData: FormData): Observable<any> {
    return this.http.post(this.baseUrl + '/addImage', formData);
  }

  rateGame(rateData): Observable<any> {
    return this.http.post(this.baseUrl + '/rateGame', rateData);
  }

  followGame(followData): Observable<any> {
    return this.http.post(this.baseUrl + '/followGame', followData);
  }

  getForYouGames(userId) {
    return this.http.get(this.baseUrl + '/getForYouGames?userId=' + userId);
  }
}
