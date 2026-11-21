import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { CreatePatientDto, Patient } from '../../models/patient.model';
import { MedicalService } from '../../services/medical.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm {

  private formBuilder = inject(FormBuilder);
  private patientService = inject(MedicalService)
  private router = inject(Router);


  saving = signal(false);
  saveError = signal<string | null>(null)

  patientForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    eirCode: [''],
    attendingDoctor: ['']
  });

  onSubmit(): void {

    
  const { firstName, lastName, age, eirCode, attendingDoctor } = this.patientForm.getRawValue();
  const newPatient: CreatePatientDto = { firstName, lastName, age, eirCode, attendingDoctor };
      
  this.saving.set(true);
  this.saveError.set(null);

      this.patientService.addPatient(newPatient).subscribe({
      next: (response) => {
        console.log('Patient added successfully:', response);
        this.router.navigate(['/patients']);
      },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    },
    });
  }
}