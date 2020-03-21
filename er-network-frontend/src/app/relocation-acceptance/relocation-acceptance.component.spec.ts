import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelocationAcceptanceComponent } from './relocation-acceptance.component';

describe('RelocationAcceptanceComponent', () => {
  let component: RelocationAcceptanceComponent;
  let fixture: ComponentFixture<RelocationAcceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelocationAcceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelocationAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
