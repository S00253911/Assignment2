import { Component, input } from '@angular/core';
import { MedicalRecord } from '../../models/medicalrecord.model';

@Component({
  selector: 'app-medicalrecord-card',
  imports: [],
  templateUrl: './medicalrecord-card.html',
  styleUrl: './medicalrecord-card.scss',
})
export class MedicalrecordCard {
 medicalrecord = input.required<MedicalRecord>();
}
