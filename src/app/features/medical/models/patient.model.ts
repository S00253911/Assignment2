import { Doctor } from "./doctor.model";

export interface PatientModel {
}

export interface Patient{
    _id?: string;
    firstName: string;
    lastName: string;
    age: number;
    eirCode?: string;
    attendingDoctor?: Doctor
}

export interface CreatePatientDto{
    firstName: string;
    lastName: string;
    age: number;
    eirCode?: string;
    attendingDoctor?: Doctor;

}