import { Component, input } from '@angular/core';
import { Patient } from '../../models/patient.model';
 
@Component({
  selector: 'app-patient-card',
  imports: [],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.scss',
})
export class PatientCard {

    patient = input.required<Patient>();
}
