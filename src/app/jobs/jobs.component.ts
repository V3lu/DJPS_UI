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

  jobLength: number = 59;
  progressBarValue: number = 0;
  constructor(private apiConnectionService: APIConnectionService) { }

  
  StartJob() {
    const input = document.getElementById('inputJobLength') as HTMLInputElement;
    this.jobLength = parseInt(input.value);

    this.apiConnectionService.StartJob(this.jobLength).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.DownloadProgress) {
          let lastChunk = event.partialText.substring(event.partialText.length - 19);
          let strings = lastChunk.split(' ');
          this.progressBarValue = parseInt(strings[1]);
        } else if (event.type === HttpEventType.Response) {
          console.log('Full stream finished:', event.body);
        }
      },
      error: (err) => console.error(err)
    });
  }
}
