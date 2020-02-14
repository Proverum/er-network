import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterComponent } from './unregister.component';

describe('UnregisterComponent', () => {
  let component: UnregisterComponent;
  let fixture: ComponentFixture<UnregisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
