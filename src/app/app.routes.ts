import { Routes } from '@angular/router';
import { PatientsPage } from './features/medical/pages/patients-page/patients-page';
import { DoctorsPage } from './features/medical/pages/doctors-page/doctors-page';
import { MedicalrecordsPage } from './features/medical/pages/medicalrecords-page/medicalrecords-page';
import { AppointmentsPage } from './features/medical/pages/appointments-page/appointments-page';

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
    path: 'doctors',
    component: DoctorsPage
},
{
    path: 'medicalrecords',
    component: MedicalrecordsPage
},
{
    path: 'appointments',
    component: AppointmentsPage
}

];
