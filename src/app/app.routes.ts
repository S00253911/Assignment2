import { Routes } from '@angular/router';
import { PatientsPage } from './features/medical/pages/patients-page/patients-page';
import { DoctorsPage } from './features/medical/pages/doctors-page/doctors-page';
import { MedicalrecordsPage } from './features/medical/pages/medicalrecords-page/medicalrecords-page';
import { AppointmentsPage } from './features/medical/pages/appointments-page/appointments-page';
import { PatientDetails } from './features/medical/pages/patient-details/patient-details';
import { DoctorDetails } from './features/medical/pages/doctor-details/doctor-details';
import { MedicalrecordDetails } from './features/medical/pages/medicalrecord-details/medicalrecord-details';
import { AppointmentDetails } from './features/medical/pages/appointment-details/appointment-details';
import { PatientForm } from './features/medical/pages/patient-form/patient-form';
import { DoctorForm } from './features/medical/pages/doctor-form/doctor-form';
import { AppointmentForm } from './features/medical/pages/appointment-form/appointment-form';
import { MedicalrecordForm } from './features/medical/pages/medicalrecord-form/medicalrecord-form';
import { MainPage } from './features/medical/pages/main-page/main-page';

export const routes: Routes = [
    // DEFAULT ROUTE
{
    path: '',
    component: MainPage,
    pathMatch: 'full'
},

// PATIENT ROUTES
{
    path: 'patients',
    component: PatientsPage
},
{
    path: 'patients/new',
    component: PatientForm
},
{
    path: 'patients/:id',
    component: PatientDetails
},
// DOCTOR ROUTES

{
    path: 'doctors',
    component: DoctorsPage
},
{
    path: 'doctors/new',
    component: DoctorForm
},
{
    path: 'doctors/:id',
    component: DoctorDetails
},
// MEDICAL RECORD ROUTES

{
    path: 'medicalrecords',
    component: MedicalrecordsPage
},
{
    path: 'medicalrecords/new',
    component: MedicalrecordForm
},
{
    path: 'medicalrecords/:id',
    component: MedicalrecordDetails
},


// APPOINTMENTS ROUTES
{
    path: 'appointments',
    component: AppointmentsPage
},
{
    path: 'appointments/new',
    component: AppointmentForm
},
{
    path: 'appointments/:id',
    component: AppointmentDetails
}
];
