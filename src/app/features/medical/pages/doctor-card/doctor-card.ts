import { Component, input} from '@angular/core';
import { DoctorDetails } from '../doctor-details/doctor-details';
import { Doctor } from '../../models/doctor.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-doctor-card',
  imports: [RouterLink],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.scss',
})
export class DoctorCard {
 doctor = input.required<Doctor>();
}
