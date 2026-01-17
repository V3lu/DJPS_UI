
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIConnectionService } from '../../../Services/apiconnection.service';

@Component({
    selector: 'app-jobs',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './jobs.component.html',
    styleUrl: './jobs.component.css'
})
export class JobsComponent {

  jobLength: number = 59;
  constructor(private apiConnectionService: APIConnectionService) { }

  
  async StartJob() {
    this.apiConnectionService.StartJob(this.jobLength).subscribe();
  }
}
