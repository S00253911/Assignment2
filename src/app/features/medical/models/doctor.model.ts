import { Patient } from "./patient.model";

export interface DoctorModel {

}

export interface Doctor{
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    specialization: string;
    age: number;
    attendingPatients: Patient[];
}

export interface CreateDoctorDto{
    title: string;
    firstName: string;
    lastName: string;
    specialization: string;
    age: number;
    attendingPatients?: string[]; 
}

export interface UpdateDoctorDto{
    title: string;
    firstName: string;
    lastName: string;
    specialization: string;
    age: number;
    attendingPatients: string[];
}