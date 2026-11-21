import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MedicalService } from '../../services/medical.service';
import { Observable } from 'rxjs';
import { Appointment } from '../../models/appointment.model';
import { AppointmentCard } from '../appointment-card/appointment-card';


@Component({
  selector: 'app-appointments-page',
  imports: [AsyncPipe, AppointmentCard],
  templateUrl: './appointments-page.html',
  styleUrl: './appointments-page.scss',
})
export class AppointmentsPage implements OnInit{
  private appointmentService = inject(MedicalService);

  appointments$!: Observable<Appointment[]>;

  ngOnInit(): void {
    this.appointments$ = this.appointmentService.getAppointments();
  }

}
