import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProjectListComponent } from './shared-project-list.component';

describe('SharedProjectListComponent', () => {
  let component: SharedProjectListComponent;
  let fixture: ComponentFixture<SharedProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
