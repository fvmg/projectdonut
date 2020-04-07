import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing.module';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { CreateGameComponent } from './create-game/create-game.component';
import { GameComponent } from './game/game.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RateGameComponent } from './rate-game/rate-game.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobsComponent } from './jobs/jobs.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ForYouComponent } from './for-you/for-you.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    HeaderComponent,
    FooterComponent,
    CreateGameComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    RateGameComponent,
    CreateJobComponent,
    JobsComponent,
    ForYouComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
