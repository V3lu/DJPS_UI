import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class APIConnectionService {

  constructor(private http: HttpClient) { }

  StartJob(jobLength: number) {
    return this.http.post<any>('https://localhost:7277/api/jobs/testcomm', jobLength); 
  }
}
