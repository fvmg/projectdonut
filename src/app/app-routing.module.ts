import { GamesComponent } from './games/games.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateGameComponent} from './create-game/create-game.component';
import {GameComponent} from './game/game.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {RateGameComponent} from './rate-game/rate-game.component';
import {CreateJobComponent} from './create-job/create-job.component';
import {JobsComponent} from './jobs/jobs.component';

const routes: Routes = [
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'games', component: GamesComponent },
  { path: 'createGame', component: CreateGameComponent },
  { path: 'game/:id', component: GameComponent },
  { path: 'rateGame/:id', component: RateGameComponent },
  { path: 'createJob', component: CreateJobComponent },
  { path: 'jobs', component: JobsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
