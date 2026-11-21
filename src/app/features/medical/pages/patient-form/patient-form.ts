import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  private medicalService = inject(MedicalService)
  private router = inject(Router);

  patientForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    age: [0, [Validators.required, Validators.min(0)]],
    eirCode: [''],
    attendingDoctor: ['']
  });

  onSubmit(): void {
    if (this.patientForm.invalid){
      return;
    }

    const patientData: Patient = this.patientForm.value as Patient;
    console.log('Submitted Patient:', patientData);

    this.medicalService.addPatient(patientData).subscribe({
      next: (response) => {
        console.log('Patient added successfully', response);
      },
      error: (error) => {
        console.error('Error adding the patient', error);
      }
    })
    this.router.navigate(['/patients']);
  }
}
