
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { DoctorCard } from '../doctor-card/doctor-card';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-doctors-page',
  imports: [DoctorCard, RouterLink, MatButton, MatButtonModule],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.scss',
})
export class DoctorsPage {


  private doctorService = inject(MedicalService);

  state = toSignal(withLoadState(this.doctorService.getDoctors()), { requireSync: true });



}
