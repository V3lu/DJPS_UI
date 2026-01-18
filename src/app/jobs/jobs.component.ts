import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../Services/apiconnection.service';
import { HttpEventType } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
    selector: 'app-jobs',
    imports: [ReactiveFormsModule, FormsModule, MatProgressBarModule],
    templateUrl: './jobs.component.html',
    styleUrl: './jobs.component.css'
})
export class JobsComponent {

  jobLength1: number = 59;
  jobLength2: number = 40;
  progressBarValue1: number = 0;
  progressBarValue2: number = 0;
  constructor(private apiConnectionService: APIConnectionService) { }

  
  StartJob1() {
    const input = document.getElementById('inputJobLength1') as HTMLInputElement;
    this.jobLength1 = parseInt(input.value);

    this.apiConnectionService.StartJob(this.jobLength1).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          let lastChunk = event.partialText.substring(event.partialText.length - 19);
          let strings = lastChunk.split(' ');
          this.progressBarValue1 = parseInt(strings[1]);
        } else if (event.type === HttpEventType.Response) {
          console.log('Full stream finished:', event.body);
        }
      },
      error: (err) => console.error(err)
    });
  }

  StartJob2() {
    const input = document.getElementById('inputJobLength2') as HTMLInputElement;
    this.jobLength2 = parseInt(input.value);

    this.apiConnectionService.StartJob(this.jobLength2).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          let lastChunk = event.partialText.substring(event.partialText.length - 19);
          let strings = lastChunk.split(' ');
          this.progressBarValue2 = parseInt(strings[1]);
        } else if (event.type === HttpEventType.Response) {
          console.log('Full stream finished:', event.body);
        }
      },
      error: (err) => console.error(err)
    });
  }
}
