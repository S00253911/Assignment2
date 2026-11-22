import { Component, inject, input, signal } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Appointment } from '../../models/appointment.model';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-appointment-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './appointment-details.html',
  styleUrl: './appointment-details.scss',
})
export class AppointmentDetails {

  private appointmentService = inject(MedicalService);
  readonly deleting = signal(false);
  private readonly router = inject(Router);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();

  readonly initial: LoadState<Appointment> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.appointmentService.getAppointmentById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteAppointment(appointment: Appointment): void{
          if(!confirm(`Delete ${appointment._id} ${appointment.patient}?`)) return;
      
          this.deleting.set(true);
          this.deleteError.set(null);
      
          this.appointmentService.deleteAppointment(appointment._id).subscribe({
            next: () => this.router.navigate(['/appointments']),
            error: (err: Error) => {
              this.deleteError.set(err.message);
              this.deleting.set(false);
            },
          });
        }
}
