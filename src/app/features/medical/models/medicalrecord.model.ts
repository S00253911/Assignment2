import { Doctor } from "./doctor.model";
import { Patient } from "./patient.model";

export interface MedicalrecordModel {
}

export interface MedicalRecord{
    _id: string;
    patient?: Patient;
    doctor?: Doctor;
    date: string;
    diagnosis?: string;
    treatment?: string;
    prescription?: string;
}
export interface CreateMedicalRecordDto{
    patient?: string;
    doctor?: string;
    date: string;
    diagnosis?: string;
    treatment?: string;
    prescription?: string;
}

export interface UpdateMedicalRecordDto{
    patient: string;
    doctor: string;
    date: string;
    diagnosis: string;
    treatment: string;
    prescription: string;
}