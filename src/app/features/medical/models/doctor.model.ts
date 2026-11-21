import { Patient } from "./patient.model";

export interface DoctorModel {

}

export interface Doctor{
    _id?: string;
    title: string;
    firstName: string;
    lastName: string;
    specialization: string;
    age: Number;
    attendingPatients: Patient[];
}
