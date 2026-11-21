import { Component, input} from '@angular/core';
import { DoctorDetails } from '../doctor-details/doctor-details';
import { Doctor } from '../../models/doctor.model';


@Component({
  selector: 'app-doctor-card',
  imports: [],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.scss',
})
export class DoctorCard {
 doctor = input.required<Doctor>();
}
