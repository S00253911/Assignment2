import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router } from '@angular/router';
import { CreateMedicalRecordDto, MedicalRecord } from '../../models/medicalrecord.model';

@Component({
  selector: 'app-medicalrecord-form',
  imports: [ReactiveFormsModule],
  templateUrl: './medicalrecord-form.html',
  styleUrl: './medicalrecord-form.scss',
})
export class MedicalrecordForm {

  private formBuilder = inject(FormBuilder);
  private medicalService = inject(MedicalService)
  private router = inject(Router);

  saving = signal(false);
  saveError = signal<string | null>(null)

  medicalRecordForm = this.formBuilder.nonNullable.group({
    patient: [''],
    doctor: [''],
    date: [''],
    diagnosis: [''],
    treatment: [''],
    prescription: [''],
  });

  onSubmit(): void {

    const {patient, doctor, date, diagnosis, treatment, prescription } = this.medicalRecordForm.getRawValue();
    const newMedicalRecord: CreateMedicalRecordDto = {patient, doctor, date, diagnosis, treatment, prescription};

    this.medicalService.addMedicalRecord(newMedicalRecord).subscribe({
      next: (response) => {
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
