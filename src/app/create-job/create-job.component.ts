import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GameService} from '../services/game.service';
import {GenreService} from '../services/genre.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JobService} from '../services/job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  jobData: any;
  job = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    requirements: new FormControl(''),
    benefits: new FormControl('')
  });

  gameId: number;
  jobId: number;

  constructor(private jobService: JobService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gameId = +this.route.snapshot.paramMap.get('gameId');
    this.jobId = +this.route.snapshot.paramMap.get('jobId');
    if (this.jobId) {
      this.fillFields();
    }
  }

  fillFields() {
    this.jobService.getJob(this.jobId)
    .subscribe(data => {
      this.job.patchValue({
        name: data.job.name,
        description: data.game.description,
        requirements: data.game.requirements,
        benefits: data.game.benefits
      });
    });
  }

  save() {
    const jobData = this.job.value;
    if (this.jobId) {
      jobData.id = this.jobId;
    }

    const formData = new FormData();
    formData.append('jobData', JSON.stringify(jobData));
    formData.append('gameId', this.gameId.toString());

    this.jobService.saveJob(formData).subscribe((response) => {
      this.router.navigate(['game', this.gameId]);
    });
  }

}
