import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { CreateAppointmentDto } from '../../models/appointment.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule, RouterLink,MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss',
})
export class AppointmentForm {

  private formBuilder = inject(FormBuilder);
  private appointmentService = inject(MedicalService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  saving = signal(false);
  saveError = signal<string | null>(null);

  appointmentForm = this.formBuilder.nonNullable.group({
    patient: ['', Validators.required],
    doctor: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    reason: ['', Validators.required],
  });

  onSubmit(): void{
    const {patient, doctor, date, time, reason } = this.appointmentForm.getRawValue();
    const newAppointment: CreateAppointmentDto = {patient, doctor, date: new Date(date), time, reason};

    this.saving.set(true);
    this.saveError.set(null);

    this.appointmentService.addAppointment(newAppointment).subscribe({
      next: (response) => {
         this.snackBar.open(`${newAppointment.date} ${newAppointment.reason} saved`, `Close`, {
          duration: 10000
        });
        console.log('Appointment added successfully', response);
        this.router.navigate(['/appointments']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(true);
      }
    });
  }
}
