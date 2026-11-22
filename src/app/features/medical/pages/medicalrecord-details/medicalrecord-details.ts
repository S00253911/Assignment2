import { Component, inject, input, signal } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { MedicalRecord } from '../../models/medicalrecord.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import {Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medicalrecord-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './medicalrecord-details.html',
  styleUrl: './medicalrecord-details.scss',
})
export class MedicalrecordDetails {

  private medicalRecordService = inject(MedicalService);
  private readonly router = inject(Router);
  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();
  readonly initial: LoadState<MedicalRecord> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.medicalRecordService.getMedicalRecordById(id))),
    ),
    { initialValue: this.initial },
  );


  deleteMedicalRecord(medicalRecord: MedicalRecord): void{
      if(!confirm(`Delete ${medicalRecord.patient} ${medicalRecord.diagnosis}?`)) return;
  
      this.deleting.set(true);
      this.deleteError.set(null);
  
      this.medicalRecordService.deleteMedicalRecord(medicalRecord._id).subscribe({
        next: () => this.router.navigate(['/medicalrecords']),
        error: (err: Error) => {
          this.deleteError.set(err.message);
          this.deleting.set(false);
        },
      });
    }
}
