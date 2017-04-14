import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDataPointsComponent } from './pending-data-points.component';

describe('PendingDataPointsComponent', () => {
  let component: PendingDataPointsComponent;
  let fixture: ComponentFixture<PendingDataPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDataPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDataPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
