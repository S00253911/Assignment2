import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicalService } from '../../services/medical.service';
import { Patient } from '../../models/patient.model';
import { AsyncPipe } from '@angular/common';
import { PatientCard } from '../patient-card/patient-card';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-patients-page',
  imports: [AsyncPipe, PatientCard, RouterLink],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.scss',
})
export class PatientsPage {

  private patientService = inject(MedicalService);

  state = toSignal(withLoadState(this.patientService.getPatients()), { requireSync: true });

}
