import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface AppointmentModel {
}

export interface Appointment{
    patient: Patient;
    doctor: Doctor;
    date: Date;
    time: string;
    reason: string;
}
