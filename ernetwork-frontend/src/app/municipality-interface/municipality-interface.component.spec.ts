import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityInterfaceComponent } from './municipality-interface.component';

describe('MunicipalityInterfaceComponent', () => {
  let component: MunicipalityInterfaceComponent;
  let fixture: ComponentFixture<MunicipalityInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MunicipalityInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
