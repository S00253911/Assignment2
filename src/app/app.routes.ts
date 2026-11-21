import { Routes } from '@angular/router';
import { PatientsPage } from './features/medical/pages/patients-page/patients-page';
import { DoctorsPage } from './features/medical/pages/doctors-page/doctors-page';
import { MedicalrecordsPage } from './features/medical/pages/medicalrecords-page/medicalrecords-page';
import { AppointmentsPage } from './features/medical/pages/appointments-page/appointments-page';
import { PatientDetails } from './features/medical/pages/patient-details/patient-details';
import { DoctorDetails } from './features/medical/pages/doctor-details/doctor-details';
import { MedicalrecordDetails } from './features/medical/pages/medicalrecord-details/medicalrecord-details';
import { AppointmentDetails } from './features/medical/pages/appointment-details/appointment-details';

export const routes: Routes = [
{
    path: '',
    redirectTo: '',
    pathMatch: 'full'
},
{
    path: 'patients',
    component: PatientsPage
},
{
    path: 'patients/:id',
    component: PatientDetails
},
{
    path: 'doctors',
    component: DoctorsPage
},
{
    path: 'doctors/:id',
    component: DoctorDetails
},
{
    path: 'medicalrecords',
    component: MedicalrecordsPage
},
{
    path: 'medicalrecords/:id',
    component: MedicalrecordDetails
},
{
    path: 'appointments',
    component: AppointmentsPage
},
{
    path: 'appointments:id',
    component: AppointmentDetails
}

];
