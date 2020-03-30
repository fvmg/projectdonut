import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Game} from '../models/game';
import {GameService} from '../services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  title = 'angularowlslider';
  customOptions: any = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  logged = false;
  genres = [];

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit() {
    this.reloadData();
    if (sessionStorage.getItem('userId')) {
      this.logged = true;
    }
  }

  gameDetails(id: number){
    this.router.navigate(['game', id]);
  }

  reloadData() {
    this.gameService.getGameList().subscribe((data: any[]) => {
      console.log('BEFORE', data);
      data.forEach((genre) => {
        genre.games.forEach((game) => {
          const base64Data = game.coverImage;
          game.coverImage = 'data:image/jpeg;base64,' + base64Data;
        });
      });
      console.log('AFTER', data);
      this.genres = data;
    });
  }

  getGames(index) {
    console.error(this.genres[index].games);
    return this.genres[index].games;
  }

}
