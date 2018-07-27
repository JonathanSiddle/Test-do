import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListsViewComponent } from './project-lists-view.component';

describe('ProjectListsViewComponent', () => {
  let component: ProjectListsViewComponent;
  let fixture: ComponentFixture<ProjectListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
