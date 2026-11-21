import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Observable } from 'rxjs';
import { MedicalRecord } from '../../models/medicalrecord.model';
import { MedicalrecordCard } from '../medicalrecord-card/medicalrecord-card';

@Component({
  selector: 'app-medicalrecords-page',
  imports: [AsyncPipe, MedicalrecordCard],
  templateUrl: './medicalrecords-page.html',
  styleUrl: './medicalrecords-page.scss',
})
export class MedicalrecordsPage implements OnInit{
  private medicalrecordsService = inject(MedicalService);

  medicalRecords$!: Observable<MedicalRecord[]>;

  ngOnInit(): void {
    this.medicalRecords$ = this.medicalrecordsService.getMedicalRecords();
  }

}
