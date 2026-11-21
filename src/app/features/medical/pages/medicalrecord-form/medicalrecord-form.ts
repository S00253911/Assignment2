import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router, RouterLink } from '@angular/router';
import { CreateMedicalRecordDto, MedicalRecord } from '../../models/medicalrecord.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicalrecord-form',
  imports: [RouterLink,ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatProgressBarModule],
  templateUrl: './medicalrecord-form.html',
  styleUrl: './medicalrecord-form.scss',
})
export class MedicalrecordForm {

  private formBuilder = inject(FormBuilder);
  private medicalService = inject(MedicalService)
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private currentYear = new Date().getFullYear();

  saving = signal(false);
  saveError = signal<string | null>(null)

  medicalRecordForm = this.formBuilder.nonNullable.group({
    patient: ['',Validators.required],
    doctor: [''],
    date: ['', Validators.required, Validators.min(this.currentYear), Validators.max(this.currentYear+2)],
    diagnosis: ['', Validators.required, Validators.minLength(10), Validators.maxLength(40)],
    treatment: ['',Validators.required, Validators.minLength(10), Validators.maxLength(40)],
    prescription: ['', Validators.minLength(2), Validators.maxLength(30)],
  });

  onSubmit(): void {

    const {patient, doctor, date, diagnosis, treatment, prescription } = this.medicalRecordForm.getRawValue();
    const newMedicalRecord: CreateMedicalRecordDto = {patient, doctor, date, diagnosis, treatment, prescription};

    this.saving.set(true);
    this.saveError.set(null);

    this.medicalService.addMedicalRecord(newMedicalRecord).subscribe({
      next: (response) => {
        this.snackBar.open(`${newMedicalRecord.diagnosis} ${newMedicalRecord.treatment} saved`, `Close`, {
          duration: 10000
        });
        console.log('Record added successfully:', response);
        this.router.navigate(['/medicalrecords']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      },
    });
  }
}
