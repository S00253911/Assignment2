import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Observable } from 'rxjs';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors-page',
  imports: [AsyncPipe],
  templateUrl: './doctors-page.html',
  styleUrl: './doctors-page.scss',
})
export class DoctorsPage implements OnInit {


  private doctorService = inject(MedicalService);

  doctors$!: Observable<Doctor[]>;

  ngOnInit(): void {
    this.doctors$ = this.doctorService.getDoctors();
  }


}
