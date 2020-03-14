import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCitizenComponent } from './delete-citizen.component';

describe('DeleteCitizenComponent', () => {
  let component: DeleteCitizenComponent;
  let fixture: ComponentFixture<DeleteCitizenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCitizenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
