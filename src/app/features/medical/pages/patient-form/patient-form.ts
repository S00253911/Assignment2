import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormArray, Validators } from '@angular/forms';
import { CreatePatientDto, Patient } from '../../models/patient.model';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validator';



@Component({
  selector: 'app-patient-form',
  imports: [RouterLink,ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm implements OnInit{

  private formBuilder = inject(FormBuilder);
  private patientService = inject(MedicalService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  readonly id = input<string>();  // note this is optional by default

  saving = signal(false);
  saveError = signal<string | null>(null)

  patientForm = this.formBuilder.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), notBlank]],
    lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40), notBlank]],
    age: [0, [Validators.required, Validators.min(0), notBlank]],
    eirCode: ['', [Validators.minLength(7), Validators.maxLength(7), notBlank]],
    attendingDoctor: ['']
  });

  onSubmit(): void {

  const { firstName, lastName, age, eirCode, attendingDoctor } = this.patientForm.getRawValue();
  const newPatient: CreatePatientDto = { firstName, lastName, age, eirCode, attendingDoctor };
      
   const id = this.id(); 
    const request = id 
    ? this.patientService.updatePatient(id, newPatient)
    : this.patientService.addPatient(newPatient);

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

  ngOnInit(): void {
    const id = this.id();
    if (!id) return; // adding a new patient, nothing to load

    this.patientService.getPatientById(id).subscribe({
      next: (patient) =>
        this.patientForm.patchValue({ firstName: patient.firstName, lastName: patient.lastName, age: patient.age, eirCode: patient.eirCode, attendingDoctor: patient.attendingDoctor?._id }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }
}