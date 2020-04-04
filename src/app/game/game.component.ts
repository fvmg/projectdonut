import { Component, OnInit } from '@angular/core';
import {Game} from '../models/game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../services/game.service';
import {UserService} from '../services/user.service';
import {JobService} from '../services/job.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  resume: File;
  coverLetter: File;
  logged = false;
  ownerUser = false;
  rating: number;
  ratingNumber: number;
  fullRates: number;
  halfRating: boolean;
  id: number;
  game: Game;
  rateArray = [
    0, 0, 0, 0, 0
  ];
  selectedMenu = 'COMMENTS';
  jobApplication;

  jobList;
  commentsList;
  modalOptions: NgbModalOptions;

  constructor(private route: ActivatedRoute, private router: Router, private gameService: GameService, private userService: UserService,
              private jobService: JobService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  ngOnInit(): void {
    this.game = new Game();

    this.id = this.route.snapshot.params.id;
    if (sessionStorage.getItem('userId')) {
      this.logged = true;
      this.checkOwner();
    }

    const job = this.route.snapshot.paramMap.get('job');
    if (job) {
      this.selectedMenu = 'JOBS';
      document.getElementById('gameMenu').scrollIntoView();
    }

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
    this.getJobs();
    this.getComments();
  }

  changeMenu(selected) {
    this.selectedMenu = selected;
  }

  checkOwner() {
    this.userService.checkOwner(sessionStorage.getItem('userId'), this.id)
    .subscribe(response => {
        this.ownerUser = true;
    }, (error) => {
        this.ownerUser = false;
    });
  }

  postJob() {
    this.router.navigate(['/createJob', {gameId: this.id}]);
  }

  getJobs() {
    this.jobService.getJobList(this.id).subscribe((data) => {
      this.jobList = data;
    });
  }

  getComments() {
    this.gameService.getComments(this.id).subscribe((data) => {
      this.commentsList = data;
      this.commentsList.forEach((comment) => {
        comment.rateArray = [
          0, 0, 0, 0, 0
        ];
        this.calculateCommentRate(comment);
      });
    });
  }

  editGame() {
    this.router.navigate(['/createGame', {gameId: this.id}]);
  }

  getRateImage(rate): string {
    if (rate === 0) {
      return '../../assets/images/greyRating.png';
    } else if (rate === 1) {
      return '../../assets/images/halfRating.png';
    }
    return '../../assets/images/fullRating.png';
  }

  getRateImageComment(rate): string {
    if (rate === 0) {
      return '../../assets/images/greyRating.png';
    }
    return '../../assets/images/fullRating.png';
  }

  rateGame() {
    this.router.navigate(['rateGame', this.id]);
  }

  calculateRate() {
    this.fullRates = Math.floor(this.rating);
    this.halfRating = !(this.rating % 1 === 0);
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

  calculateCommentRate(comment) {
    const fullRates = comment.rating;
    for (let i = 0; i < 5; i++) {
      if (i < fullRates) {
        comment.rateArray[i] = 1;
      } else {
        comment.rateArray[i] = 0;
      }
    }
  }

  open(content, job) {
    this.jobApplication = job;
    this.modalService.open(content, this.modalOptions).result.then((result) => {});
  }

  onResumeChanged(event) {
    this.resume = event.target.files[0];
  }

  onCoverLetterChanged(event) {
    this.coverLetter = event.target.files[0];
  }

  applyJob() {
    const formData = new FormData();
    formData.append('resume', this.resume);
    formData.append('coverLetter', this.coverLetter);
    formData.append('jobId', this.jobApplication.id);
    formData.append('userId', sessionStorage.getItem('userId'));

    this.jobService.applyJob(formData).subscribe((response) => {
      this.modalService.dismissAll();
    });
  }

}
