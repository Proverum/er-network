import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDashboardComponent } from './node-dashboard.component';

describe('NodeDashboardComponent', () => {
  let component: NodeDashboardComponent;
  let fixture: ComponentFixture<NodeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
