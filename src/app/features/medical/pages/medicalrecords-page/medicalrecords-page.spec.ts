import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalrecordsPage } from './medicalrecords-page';

describe('MedicalrecordsPage', () => {
  let component: MedicalrecordsPage;
  let fixture: ComponentFixture<MedicalrecordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalrecordsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalrecordsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
