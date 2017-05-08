import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlowItemComponent } from './add-flow-item.component';

describe('AddFlowItemComponent', () => {
  let component: AddFlowItemComponent;
  let fixture: ComponentFixture<AddFlowItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFlowItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFlowItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
