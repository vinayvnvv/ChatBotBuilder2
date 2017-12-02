import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBotComponent } from './get-bot.component';

describe('GetBotComponent', () => {
  let component: GetBotComponent;
  let fixture: ComponentFixture<GetBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
