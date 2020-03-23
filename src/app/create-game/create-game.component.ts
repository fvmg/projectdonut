import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {GameService} from '../services/game.service';
import {GenreService} from '../services/genre.service';
import {Router} from '@angular/router';

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

  constructor(private gameService: GameService, private genreService: GenreService, private router: Router) { }

  ngOnInit(): void {
    this.getAllBaseGenres();
  }

  getAllBaseGenres() {
    this.genreService.getAllBase().subscribe((data: any[]) => {
      console.log(data);
      this.genres = data;
    });
  }

  save() {
    const gameData = this.game.value;
    const gameGenre = gameData.genre;
    delete gameData.genre;
    const formData = new FormData();
    formData.append('gameData', JSON.stringify(gameData));
    formData.append('gameGenre', gameGenre);
    formData.append('coverImage', this.coverImage);

    this.gameService.saveGame(formData).subscribe((response) => {
      this.router.navigate(['game', response.id]);
    });
  }

  onFileChanged(event) {
    this.coverImage = event.target.files[0];
  }

}
