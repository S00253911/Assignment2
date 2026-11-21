import { Component, inject, input } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { MedicalRecord } from '../../models/medicalrecord.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medicalrecord-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './medicalrecord-details.html',
  styleUrl: './medicalrecord-details.scss',
})
export class MedicalrecordDetails {

  private medicalRecordService = inject(MedicalService);

  readonly id = input.required<string>();

  readonly initial: LoadState<MedicalRecord> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.medicalRecordService.getMedicalRecordById(id))),
    ),
    { initialValue: this.initial },
  );
}
