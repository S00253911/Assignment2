import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { MedicalrecordCard } from '../medicalrecord-card/medicalrecord-card';
import { RouterLink } from '@angular/router';
import { withLoadState } from '../../../../shared/load-state';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-medicalrecords-page',
  imports: [ MedicalrecordCard, RouterLink, MatButton, MatButtonModule],
  templateUrl: './medicalrecords-page.html',
  styleUrl: './medicalrecords-page.scss',
})
export class MedicalrecordsPage{
  private medicalrecordsService = inject(MedicalService);

  state = toSignal(withLoadState(this.medicalrecordsService.getMedicalRecords()), { requireSync: true });
}
