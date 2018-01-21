import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTemplatesComponent } from './add-templates.component';

describe('AddTemplatesComponent', () => {
  let component: AddTemplatesComponent;
  let fixture: ComponentFixture<AddTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTemplatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
