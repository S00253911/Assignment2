
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { DoctorCard } from '../doctor-card/doctor-card';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-doctors-page',
  imports: [DoctorCard, RouterLink],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.scss',
})
export class DoctorsPage {


  private doctorService = inject(MedicalService);

  state = toSignal(withLoadState(this.doctorService.getDoctors()), { requireSync: true });



}
