import { Component, inject } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { PatientCard } from '../patient-card/patient-card';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patients-page',
  imports: [PatientCard, RouterLink, MatButton, MatButtonModule],
  templateUrl: './patients-page.html',
  styleUrl: './patients-page.scss',
})
export class PatientsPage {

  private patientService = inject(MedicalService);

  state = toSignal(withLoadState(this.patientService.getPatients()), { requireSync: true });

}
