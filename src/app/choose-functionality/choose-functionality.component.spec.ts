import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFunctionalityComponent } from './choose-functionality.component';

describe('ChooseFunctionalityComponent', () => {
  let component: ChooseFunctionalityComponent;
  let fixture: ComponentFixture<ChooseFunctionalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFunctionalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFunctionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
