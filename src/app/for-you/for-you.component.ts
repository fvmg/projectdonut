import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';
import {Router} from '@angular/router';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-for-you',
  templateUrl: './for-you.component.html',
  styleUrls: ['./for-you.component.css']
})
export class ForYouComponent implements OnInit {

  jobs = [];
  games = [];
  userId;

  constructor(private jobService: JobService, private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('userId')) {
      this.userId = +sessionStorage.getItem('userId');
    }
    this.reloadData();
  }

  reloadData() {
    this.jobService.getForYouJobs(this.userId).subscribe((data: any[]) => {
      data.forEach((job) => {
        const base64Data = job.coverImage;
        job.coverImage = 'data:image/jpeg;base64,' + base64Data;
      });
      this.jobs = data;
    });

    this.gameService.getForYouGames(this.userId).subscribe((data: any[]) => {
      data.forEach((game) => {
        const base64Data = game.coverImage;
        game.coverImage = 'data:image/jpeg;base64,' + base64Data;
      });
      this.games = data;
    });
  }

  openJob(gameId) {
    this.router.navigate(['game', gameId, {job: true}]);
  }

  openGame(gameId) {
    this.router.navigate(['game', gameId]);
  }


}
