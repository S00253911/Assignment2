import { Component, input} from '@angular/core';
import { Appointment } from '../../models/appointment.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-appointment-card',
  imports: [RouterLink],
  templateUrl: './appointment-card.html',
  styleUrl: './appointment-card.scss',
})
export class AppointmentCard {
   appointment = input.required<Appointment>();
}
