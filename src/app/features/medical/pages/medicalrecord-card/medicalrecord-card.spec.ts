import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalrecordCard } from './medicalrecord-card';

describe('MedicalrecordCard', () => {
  let component: MedicalrecordCard;
  let fixture: ComponentFixture<MedicalrecordCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalrecordCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalrecordCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
