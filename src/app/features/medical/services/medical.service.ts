import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';  
import { Observable, throwError } from 'rxjs';
import { CreatePatientDto, Patient } from '../models/patient.model';
import { CreateDoctorDto, Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { CreateMedicalRecordDto, MedicalRecord } from '../models/medicalrecord.model';
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

 //  FUNCTIONS FOR PATIENTS
 getPatients(): Observable<Patient[]>{
  return this.http.get<Patient[]>(this.patientApiUrl)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }
 getPatientById(id: string): Observable<Patient>{
  return this.http.get<Patient>(`${this.patientApiUrl}/${id}`)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 } 
 addPatient(patient: CreatePatientDto): Observable<Patient>{
  return this.http.post<Patient>(this.patientApiUrl, patient)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }


//  FUNCTIONS FOR DOCTORS
 getDoctors(): Observable<Doctor[]>{
  return this.http.get<Doctor[]>(this.doctorApiUrl)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }
 getDoctorById(id: string): Observable<Doctor>{
  return this.http.get<Doctor>(`${this.doctorApiUrl}/${id}`)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 } 
  addDoctor(doctor: CreateDoctorDto): Observable<Doctor>{
  return this.http.post<Doctor>(this.doctorApiUrl, doctor)
  .pipe(
    catchError((err) => this.handleError(err))
  );
}

//  FUNCTIONS FOR APPOINTMENTS
 getAppointments(): Observable<Appointment[]>{
  return this.http.get<Appointment[]>(this.appointmentApiUrl)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }
 getAppointmentById(id: string): Observable<Appointment>{
  return this.http.get<Appointment>(`${this.appointmentApiUrl}/${id}`)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 } 


//  FUNCTIONS FOR MEDICAL RECORDS
 getMedicalRecords(): Observable<MedicalRecord[]>{
  return this.http.get<MedicalRecord[]>(this.medicalrecordsApiUrl)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }
 getMedicalRecordById(id: string): Observable<MedicalRecord>{
  return this.http.get<MedicalRecord>(`${this.medicalrecordsApiUrl}/${id}`)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }

 addMedicalRecord(medicalRecord: CreateMedicalRecordDto): Observable<MedicalRecord>{
  return this.http.post<MedicalRecord>(this.medicalrecordsApiUrl, medicalRecord)
  .pipe(
    catchError((err) => this.handleError(err))
  );
 }


 private handleError(error: HttpErrorResponse): Observable<never> {
    let message: string;

    switch (error.status) {
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid.';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You are not allowed to do that.';
        break;
      case 404:
        message = 'That query could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }
    // Details for dev, short for user
    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }

}



