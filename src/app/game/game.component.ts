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

  fullRates: number;
  halfRating: boolean;
  id: number;
  game: Game;

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.game = new Game();
    this.fullRates = 4;
    this.halfRating = true;

    this.id = this.route.snapshot.params.id;

    this.gameService.getGame(this.id)
    .subscribe(data => {
      const base64Data = data.coverImage;
      data.coverImage = 'data:image/jpeg;base64,' + base64Data;
      this.game = data;
      console.log(this.game);
    });
  }

  ratingToArray(): any[] {
    return Array(4);
  }

}
