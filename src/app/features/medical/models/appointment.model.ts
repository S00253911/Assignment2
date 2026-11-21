import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface AppointmentModel {
}

export interface Appointment{
    _id?: string;
    patient: Patient;
    doctor: Doctor;
    date: Date;
    time: string;
    reason: string;
}

export interface CreateAppointmentDto{
    patient: string;
    doctor: string;
    date: Date;
    time: string;
    reason: string;
}