import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalrecordDetails } from './medicalrecord-details';

describe('MedicalrecordDetails', () => {
  let component: MedicalrecordDetails;
  let fixture: ComponentFixture<MedicalrecordDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalrecordDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalrecordDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
