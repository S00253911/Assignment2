import { Component, inject, input, signal } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { Patient } from '../../models/patient.model';
import { switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss',
})
export class PatientDetails {

  private patientService = inject(MedicalService);

  private readonly router = inject(Router);

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  readonly id = input.required<string>();
  readonly initial: LoadState<Patient> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.patientService.getPatientById(id))),
    ),
    { initialValue: this.initial },
  );


  deletePatient(patient: Patient): void{
    if(!confirm(`Delete ${patient.firstName} ${patient.lastName}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.patientService.deletePatient(patient._id).subscribe({
      next: () => this.router.navigate(['/patients']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}

