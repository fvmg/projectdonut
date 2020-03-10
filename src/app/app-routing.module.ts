import { GamesComponent } from './games/games.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGameComponent} from './create-game/create-game.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'games', component: GamesComponent },
  { path: 'createGame', component: CreateGameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
