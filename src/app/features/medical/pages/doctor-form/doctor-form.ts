import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CreateDoctorDto } from '../../models/doctor.model';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.scss',
})
export class DoctorForm {

  private formBuilder = inject(FormBuilder);
  private medicalService = inject(MedicalService)
  private router = inject(Router);

  saving = signal(false);
  saveError = signal<string | null>(null);

  doctorForm = this.formBuilder.nonNullable.group({
    title: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
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
