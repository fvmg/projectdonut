import { Component, OnInit } from '@angular/core';
import {JobService} from '../services/job.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs = [];

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.jobService.getAllJobs().subscribe((data: any[]) => {
      data.forEach((job) => {
        const base64Data = job.coverImage;
        job.coverImage = 'data:image/jpeg;base64,' + base64Data;
      });
      this.jobs = data;
    });
  }

  openJob(gameId) {
    this.router.navigate(['game', gameId, {job: true}]);
  }

}
