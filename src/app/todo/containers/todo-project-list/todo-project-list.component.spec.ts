import { HttpClient } from '@angular/common/http';
import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { TodoProjectListComponent } from './todo-project-list.component';
import { ToDoProject } from '../../../shared/models/todoProject';
import { asyncData } from '../../../../testing/shared/async-observable-helpers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


let httpClientSpy: { get: jasmine.Spy };
httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

describe('TodoProjectListComponent', () => {
  let component: TodoProjectListComponent;
  let fixture: ComponentFixture<TodoProjectListComponent>;
  // used for testing
  let projectServiceTest: ProjectService;

  beforeEach(() => {

  });

  beforeEach(async(() => {
    projectServiceTest = new ProjectService(<any> httpClientSpy);
    httpClientSpy.get.and.returnValue(asyncData(Array<ToDoProject>()));

    TestBed.configureTestingModule({
      declarations: [ TodoProjectListComponent ],
      providers: [
        {provide: ProjectService, useValue: projectServiceTest}
      ],
      // providers: [{provide: ProjectService, useValue: projectServiceTest}],
      schemas: [NO_ERRORS_SCHEMA] // used to avoid errors with dependencies, i.e. child component
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectListComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get projects after init', () => {
    // set up return data
    fixture.detectChanges();
    const expectedProjects: ToDoProject[] = [{Id: 3, Name: 'Test3', Owner : 'Jon'}, {Id: 4, Name: 'Test4', Owner : 'Jon'}];
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });
});
