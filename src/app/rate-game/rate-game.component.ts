import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GameService} from '../services/game.service';
import {Game} from '../models/game';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-rate-game',
  templateUrl: './rate-game.component.html',
  styleUrls: ['./rate-game.component.css']
})
export class RateGameComponent implements OnInit {
  id: number;
  game: Game;
  rateArray = [
    false, false, false, false, false
  ];

  rate = new FormGroup({
    comments: new FormControl('')
  });
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.gameService.getGame(this.id)
    .subscribe(data => {
      const base64Data = data.coverImage;
      data.coverImage = 'data:image/jpeg;base64,' + base64Data;
      this.game = data;

    });
  }

  getRateImage(rate): string {
    if (rate) {
      return '../../assets/images/fullRating.png';
    }
    return '../../assets/images/greyRating.png';
  }

  changeRate(index) {
    for (let i = 0; i < 5; i++) {
      if (i <= index) {
        this.rateArray[i] = true;
      } else {
        this.rateArray[i] = false;
      }
    }
  }

  getRatingValue() {
    let sum = 0;
    for (const val of this.rateArray) {
      if (val) {
        sum++;
      }
    }
    return sum;
  }

  rateGame() {
    const rateData = this.rate.value;
    rateData.rating = this.getRatingValue();
    rateData.userId = sessionStorage.getItem('userId');
    rateData.gameId = this.id;

    this.gameService.rateGame(rateData).subscribe((response) => {
      this.router.navigate(['game', this.id]);
    });
  }

}
