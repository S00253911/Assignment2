import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalService } from '../../services/medical.service';
import { Patient } from '../../models/patient.model';
import { AsyncPipe } from '@angular/common';
import { PatientCard } from '../patient-card/patient-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patients-page',
  imports: [AsyncPipe, PatientCard, RouterLink],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.scss',
})
export class PatientsPage implements OnInit {

  private patientService = inject(MedicalService);

  patients$!: Observable<Patient[]>;

  ngOnInit(): void {
    this.patients$ = this.patientService.getPatients();
  }
}
