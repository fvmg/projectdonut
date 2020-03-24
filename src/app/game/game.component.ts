import { Component, OnInit } from '@angular/core';
import {Game} from '../models/game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  rating: number;
  ratingNumber: number;
  fullRates: number;
  halfRating: boolean;
  id: number;
  game: Game;
  rateArray = [
    0, 0, 0, 0, 0
  ];

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.game = new Game();

    this.id = this.route.snapshot.params.id;

    this.gameService.getGame(this.id)
    .subscribe(data => {
      const base64Data = data.game.coverImage;
      data.game.coverImage = 'data:image/jpeg;base64,' + base64Data;
      this.game = data.game;
      this.rating = data.rating.toPrecision(3);
      this.ratingNumber = data.ratingNumber;
      this.calculateRate();
      console.log(this.game);
    });
  }

  getRateImage(rate): string {
    if (rate === 0) {
      return '../../assets/images/greyRating.png';
    } else if (rate === 1) {
      return '../../assets/images/halfRating.png';
    }
    return '../../assets/images/fullRating.png';
  }

  rateGame() {
    this.router.navigate(['rateGame', this.id]);
  }

  calculateRate() {
    this.fullRates = Math.floor(this.rating);
    this.halfRating = !Number.isInteger(this.rating);
    for (let i = 0; i < 5; i++) {
      if (i < this.fullRates) {
        this.rateArray[i] = 2;
      } else if (this.halfRating && i === this.fullRates && this.ratingNumber !== 0)  {
        this.rateArray[i] = 1;
      } else {
        this.rateArray[i] = 0;
      }
    }

  }

}
