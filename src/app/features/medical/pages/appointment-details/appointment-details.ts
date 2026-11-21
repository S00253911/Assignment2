import { Component, inject, input } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Appointment } from '../../models/appointment.model';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './appointment-details.html',
  styleUrl: './appointment-details.scss',
})
export class AppointmentDetails {

  private appointmentService = inject(MedicalService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Appointment> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.appointmentService.getAppointmentById(id))),
    ),
    { initialValue: this.initial },
  );
}
