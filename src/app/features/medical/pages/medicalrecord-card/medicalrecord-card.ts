import { Component, input } from '@angular/core';
import { MedicalRecord } from '../../models/medicalrecord.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicalrecord-card',
  imports: [RouterLink],
  templateUrl: './medicalrecord-card.html',
  styleUrl: './medicalrecord-card.scss',
})
export class MedicalrecordCard {
 medicalrecord = input.required<MedicalRecord>();
}
