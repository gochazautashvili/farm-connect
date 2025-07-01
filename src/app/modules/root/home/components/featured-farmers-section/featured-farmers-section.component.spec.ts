import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedFarmersSectionComponent } from './featured-farmers-section.component';

describe('FeaturedFarmersSectionComponent', () => {
  let component: FeaturedFarmersSectionComponent;
  let fixture: ComponentFixture<FeaturedFarmersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedFarmersSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedFarmersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
