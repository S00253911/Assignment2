import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { CreateAppointmentDto } from '../../models/appointment.model';


@Component({
  selector: 'app-appointment-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss',
})
export class AppointmentForm {

  private formBuilder = inject(FormBuilder);
  private appointmentService = inject(MedicalService);
  private router = inject(Router);

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
