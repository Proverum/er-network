import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyErComponent } from './verify-er.component';

describe('VerifyErComponent', () => {
  let component: VerifyErComponent;
  let fixture: ComponentFixture<VerifyErComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyErComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyErComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
