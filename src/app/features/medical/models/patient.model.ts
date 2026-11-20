import { Doctor } from "./doctor.model";

export interface PatientModel {
}

export interface Patient{
    firstName: string;
    lastName: string;
    age: Number;
    eirCode: string;
    attendingDoctor: Doctor
}