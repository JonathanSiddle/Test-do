import { RouterModule } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListsViewComponent } from './project-lists-view.component';
import { MaterialImportsModule } from 'src/app/shared/material-imports.module';

describe('ProjectListsViewComponent', () => {
  let component: ProjectListsViewComponent;
  let fixture: ComponentFixture<ProjectListsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialImportsModule, RouterModule],
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
