import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateErComponent } from './generate-er.component';

describe('GenerateErComponent', () => {
  let component: GenerateErComponent;
  let fixture: ComponentFixture<GenerateErComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateErComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateErComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
