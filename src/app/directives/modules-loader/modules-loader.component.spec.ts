import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulesLoaderComponent } from './modules-loader.component';

describe('ModulesLoaderComponent', () => {
  let component: ModulesLoaderComponent;
  let fixture: ComponentFixture<ModulesLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModulesLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
