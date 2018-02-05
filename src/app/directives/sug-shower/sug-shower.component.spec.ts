import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SugShowerComponent } from './sug-shower.component';

describe('SugShowerComponent', () => {
  let component: SugShowerComponent;
  let fixture: ComponentFixture<SugShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SugShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SugShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
