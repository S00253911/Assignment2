import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CreateDoctorDto } from '../../models/doctor.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.scss',
})
export class DoctorForm {

  private formBuilder = inject(FormBuilder);
  private medicalService = inject(MedicalService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);

  doctorForm = this.formBuilder.nonNullable.group({
    title: ['', Validators.required, Validators.minLength(2)],
    firstName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    lastName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    specialization: ['', Validators.required],
    age: [0 ,[ Validators.required, Validators.min(0)]],
    attendingPatients: [],
  });

  onSubmit(): void {

    const {title, firstName, lastName, specialization, age, attendingPatients } = this.doctorForm.getRawValue();
    const newDoctor: CreateDoctorDto = {title, firstName, lastName, specialization, age, attendingPatients};

    this.saving.set(true);
    this.saveError.set(null);

    this.medicalService.addDoctor(newDoctor).subscribe({
      next: (response) => {
        this.snackBar.open(`${newDoctor.firstName} ${newDoctor.lastName} saved`, `Close`, {
          duration: 10000
        });
        console.log('Doctor added successfully:', response);
        this.router.navigate(['/doctors']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
