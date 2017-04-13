import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiLocationComponent } from './poi-location.component';

describe('PoiLocationComponent', () => {
  let component: PoiLocationComponent;
  let fixture: ComponentFixture<PoiLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
