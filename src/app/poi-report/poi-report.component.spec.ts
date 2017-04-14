import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiReportComponent } from './poi-report.component';

describe('PoiReportComponent', () => {
  let component: PoiReportComponent;
  let fixture: ComponentFixture<PoiReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
