import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { CreatePatientDto, Patient } from '../../models/patient.model';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatSnackBar } from '@angular/material/snack-bar'


@Component({
  selector: 'app-patient-form',
  imports: [RouterLink,ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm {

  private formBuilder = inject(FormBuilder);
  private patientService = inject(MedicalService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null)

  patientForm = this.formBuilder.nonNullable.group({
    firstName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    lastName: ['', Validators.required, Validators.minLength(2), Validators.maxLength(40)],
    age: [0, [Validators.required, Validators.min(0)]],
    eirCode: ['', [Validators.minLength(7), Validators.maxLength(7)]],
    attendingDoctor: ['']
  });

  onSubmit(): void {

    
  const { firstName, lastName, age, eirCode, attendingDoctor } = this.patientForm.getRawValue();
  const newPatient: CreatePatientDto = { firstName, lastName, age, eirCode, attendingDoctor };
      
  this.saving.set(true);
  this.saveError.set(null);

      this.patientService.addPatient(newPatient).subscribe({
      next: (response) => {
        this.snackBar.open(`${newPatient.firstName} ${newPatient.lastName} saved`, `Close`, {
          duration: 10000
        });
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