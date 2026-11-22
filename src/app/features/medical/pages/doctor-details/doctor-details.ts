import { Component, inject, input, signal } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { Doctor } from '../../models/doctor.model';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doctor-details',
  imports: [RouterLink, MatButton, MatButtonModule],
  templateUrl: './doctor-details.html',
  styleUrl: './doctor-details.scss',
})
export class DoctorDetails {
  
  private doctorService = inject(MedicalService);
  readonly deleting = signal(false);
  private readonly router = inject(Router);
  readonly deleteError = signal<string | null>(null);
  readonly id = input.required<string>();

  readonly initial: LoadState<Doctor> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.doctorService.getDoctorById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteDoctor(doctor: Doctor): void{
        if(!confirm(`Delete ${doctor._id} ${doctor.firstName}?`)) return;
    
        this.deleting.set(true);
        this.deleteError.set(null);
    
        this.doctorService.deleteDoctor(doctor._id).subscribe({
          next: () => this.router.navigate(['/doctors']),
          error: (err: Error) => {
            this.deleteError.set(err.message);
            this.deleting.set(false);
          },
        });
      }
}
