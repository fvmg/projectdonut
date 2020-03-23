import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-rate-game',
  templateUrl: './rate-game.component.html',
  styleUrls: ['./rate-game.component.css']
})
export class RateGameComponent implements OnInit {

  game = new FormGroup({
    comments: new FormControl('')
  });
  constructor() { }

  ngOnInit(): void {
  }

}
