import { Component, inject, input } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { Doctor } from '../../models/doctor.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-doctor-details',
  imports: [RouterLink],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.scss',
})
export class DoctorDetails {
  
  private doctorService = inject(MedicalService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Doctor> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.doctorService.getDoctorById(id))),
    ),
    { initialValue: this.initial },
  );

}
