import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface MedicalrecordModel {
}

export interface MedicalRecord{
    patient: Patient;
    doctor: Doctor;
    date: Date;
    diagnosis: string;
    treatment: string;
    prescription: string;
}