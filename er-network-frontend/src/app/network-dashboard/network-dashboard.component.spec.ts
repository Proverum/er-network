import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDashboardComponent } from './network-dashboard.component';

describe('NetworkDashboardComponent', () => {
  let component: NetworkDashboardComponent;
  let fixture: ComponentFixture<NetworkDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
