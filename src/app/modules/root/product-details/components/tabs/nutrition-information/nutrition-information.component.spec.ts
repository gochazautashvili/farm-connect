import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionInformationComponent } from './nutrition-information.component';

describe('NutritionInformationComponent', () => {
  let component: NutritionInformationComponent;
  let fixture: ComponentFixture<NutritionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutritionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
