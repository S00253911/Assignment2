import { Doctor } from "./doctor.model";

export interface PatientModel {
}

export interface Patient{
    _id?: string;
    firstName: string;
    lastName: string;
    age: Number;
    eirCode: string;
    attendingDoctor: Doctor
}