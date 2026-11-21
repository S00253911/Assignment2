import { Component, input } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-patient-card',
  imports: [RouterLink],
  templateUrl: './patient-card.html',
  styleUrl: './patient-card.scss',
})
export class PatientCard {

    patient = input.required<Patient>();
}
