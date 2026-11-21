import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicalService } from '../../services/medical.service';
import { Router } from '@angular/router';
import { MedicalRecord } from '../../models/medicalrecord.model';

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

  medicalRecordForm = this.formBuilder.group({
    patient: [''],
    doctor: [''],
    date: [''],
    diagnosis: [''],
    treatment: [''],
    prescription: [''],
  });

  onSubmit(): void {
    if (this.medicalRecordForm.invalid){
      return;
    }

    const medicalRecord: MedicalRecord = this.medicalRecordForm.value as MedicalRecord;
    console.log('Submitted Medical Record:', medicalRecord);

    this.medicalService.addMedicalRecord(medicalRecord).subscribe({
      next: (response) => {
        console.log('Medical Record added successfully', response);
      },
      error: (error) => {
        console.error('Error adding the medical record', error);
      }
    })
    this.router.navigate(['/medicalrecords']);
  }
}
