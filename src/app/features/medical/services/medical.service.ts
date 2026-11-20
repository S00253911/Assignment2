import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';  
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
@Injectable({
  providedIn: 'root',
})
export class MedicalService {
 private http = inject(HttpClient) 

 private apiUrl = 'http://localhost:3001/patient'; 

 getPatients(): Observable<Patient[]>{
  return this.http.get<Patient[]>(this.apiUrl);
 }
}
