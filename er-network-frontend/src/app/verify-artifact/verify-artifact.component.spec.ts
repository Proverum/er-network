import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyArtifactComponent } from './verify-artifact.component';

describe('VerifyArtifactComponent', () => {
  let component: VerifyArtifactComponent;
  let fixture: ComponentFixture<VerifyArtifactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyArtifactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyArtifactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
