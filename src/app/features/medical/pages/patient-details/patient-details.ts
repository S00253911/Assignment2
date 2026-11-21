import { Component, inject, input } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { Patient } from '../../models/patient.model';
import { switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  imports: [RouterLink],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss',
})
export class PatientDetails {

  private patientService = inject(MedicalService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Patient> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.patientService.getPatientById(id))),
    ),
    { initialValue: this.initial },
  );

}

