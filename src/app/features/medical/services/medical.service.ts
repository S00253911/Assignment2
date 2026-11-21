import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';  
import { Observable, throwError } from 'rxjs';
import { CreatePatientDto, Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { MedicalRecord } from '../models/medicalrecord.model';
import { catchError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MedicalService {

  // INJECTING HTTPCLIENT SO THE FRONTEND CAN CONNECT TO THE BACKEND
 private http = inject(HttpClient) 

// ENDPOINTS FOR EACH OF THE MODELS
 private patientApiUrl = 'http://localhost:3001/api/patient'; 
 private doctorApiUrl = 'http://localhost:3001/api/doctors'; 
 private appointmentApiUrl = 'http://localhost:3001/api/appointments'
 private medicalrecordsApiUrl = 'http://localhost:3001/api/medicalrecords'; 

 // GET FUNCTION FOR PATIENTS
 getPatients(): Observable<Patient[]>{
  return this.http.get<Patient[]>(this.patientApiUrl);
 }
 getPatientById(id: string): Observable<Patient>{
  return this.http.get<Patient>(`${this.patientApiUrl}/${id}`)
 } 

 addPatient(patient: CreatePatientDto): Observable<Patient>{
  return this.http.post<Patient>(this.patientApiUrl, patient)
  .pipe(
    catchError((err) => this.handleErrorPatient(err))
  )
 }
// GET FUNCTION FOR DOCTORS
 getDoctors(): Observable<Doctor[]>{
  return this.http.get<Doctor[]>(this.doctorApiUrl);
 }
 getDoctorById(id: string): Observable<Doctor>{
  return this.http.get<Doctor>(`${this.doctorApiUrl}/${id}`)
 } 
// GET FUNCTION FOR APPOINTMENTS
 getAppointments(): Observable<Appointment[]>{
  return this.http.get<Appointment[]>(this.appointmentApiUrl);
 }
 getAppointmentById(id: string): Observable<Appointment>{
  return this.http.get<Appointment>(`${this.appointmentApiUrl}/${id}`)
 } 
// GET FUNCTION FOR MEDICAL RECORDS
 getMedicalRecords(): Observable<MedicalRecord[]>{
  return this.http.get<MedicalRecord[]>(this.medicalrecordsApiUrl);
 }
 getMedicalRecordById(id: string): Observable<MedicalRecord>{
  return this.http.get<MedicalRecord>(`${this.medicalrecordsApiUrl}/${id}`)
 }



  private handleErrorPatient(error: HttpErrorResponse) : Observable<never>{
    let message: string;

    switch (error.status){
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You do not have permission to perform this action.';
        break;
      case 404:
        message = 'That patient could not be found';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }
    // Full details for the developer, a short message for the user
    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  } 
}





