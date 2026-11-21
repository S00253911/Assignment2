import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatePatientDto, Patient } from '../../models/patient.model';


@Component({
  selector: 'app-patient-form',
  imports: [ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.scss',
})
export class PatientForm {

  private formBuilder = inject(FormBuilder);
  

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
  }
}
