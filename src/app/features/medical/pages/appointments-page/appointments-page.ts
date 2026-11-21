
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { AppointmentCard } from '../appointment-card/appointment-card';
import { RouterLink } from '@angular/router';
import { withLoadState } from '../../../../shared/load-state';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-appointments-page',
  imports: [ AppointmentCard, RouterLink, MatButton, MatButtonModule],
  templateUrl: './appointments-page.html',
  styleUrl: './appointments-page.scss',
})
export class AppointmentsPage {
  private appointmentService = inject(MedicalService);

 state = toSignal(withLoadState(this.appointmentService.getAppointments()), { requireSync: true });
}
