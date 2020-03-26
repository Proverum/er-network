import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspNodeComponent } from './esp-node.component';

describe('EspNodeComponent', () => {
  let component: EspNodeComponent;
  let fixture: ComponentFixture<EspNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
