import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';  
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';
import { MedicalRecord } from '../models/medicalrecord.model';
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
// GET FUNCTION FOR DOCTORS
 getDoctors(): Observable<Doctor[]>{
  return this.http.get<Doctor[]>(this.doctorApiUrl);
 }
// GET FUNCTION FOR APPOINTMENTS
 getAppointments(): Observable<Appointment[]>{
  return this.http.get<Appointment[]>(this.appointmentApiUrl);
 }
// GET FUNCTION FOR MEDICAL RECORDS
 getMedicalRecords(): Observable<MedicalRecord[]>{
  return this.http.get<MedicalRecord[]>(this.medicalrecordsApiUrl);
 }
}


