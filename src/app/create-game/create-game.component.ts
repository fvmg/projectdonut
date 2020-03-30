import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {GameService} from '../services/game.service';
import {GenreService} from '../services/genre.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  coverImage: File;
  gameData: any;
  game = new FormGroup({
    name: new FormControl(''),
    genre: new FormControl(''),
    releaseDate: new FormControl(''),
    version: new FormControl(''),
    downloadLink: new FormControl(''),
    briefDescription: new FormControl(''),
    fullDescription: new FormControl('')
  });

  genres = [];
  gameId: number;

  constructor(private gameService: GameService, private genreService: GenreService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllBaseGenres();
    this.gameId = +this.route.snapshot.paramMap.get('gameId');
    if (this.gameId) {
      this.fillFields();
    }
  }

  fillFields() {
    this.gameService.getGame(this.gameId)
    .subscribe(data => {
      let genreName = '';
      data.game.genres.forEach((obj) => {
        if (obj.baseGenre) {
          genreName = obj.name;
        }
      });
      this.game.patchValue({
        name: data.game.name,
        genre: genreName,
        releaseDate: data.game.releaseDate,
        version: data.game.version,
        downloadLink: data.game.downloadLink,
        briefDescription: data.game.briefDescription,
        fullDescription: data.game.fullDescription
      });
    });
  }

  getAllBaseGenres() {
    this.genreService.getAllBase().subscribe((data: any[]) => {
      console.log(data);
      this.genres = data;
    });
  }

  save() {
    const gameData = this.game.value;
    if (this.gameId) {
      gameData.id = this.gameId;
    }
    if (!this.coverImage) {
      this.coverImage = null;
    }
    const gameGenre = gameData.genre;
    delete gameData.genre;
    const formData = new FormData();
    formData.append('gameData', JSON.stringify(gameData));
    formData.append('gameGenre', gameGenre);
    formData.append('userId', sessionStorage.getItem('userId'));
    formData.append('coverImage', this.coverImage);

    this.gameService.saveGame(formData).subscribe((response) => {
      this.router.navigate(['game', response.id]);
    });
  }

  onFileChanged(event) {
    this.coverImage = event.target.files[0];
  }

}
