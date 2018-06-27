import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';

import { TodoProjectListComponent } from './todo-project-list.component';
import { ToDoProject } from '../../../shared/models/todoProject';
import { asyncData } from '../../../../testing/shared/async-observable-helpers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

describe('TodoProjectListComponent', () => {

  let component: TodoProjectListComponent;
  let fixture: ComponentFixture<TodoProjectListComponent>;

  // set up project service with fake http client
  let httpClientSpy: { get: jasmine.Spy };
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  let projectServiceTest: ProjectService;
  projectServiceTest = new ProjectService(<any> httpClientSpy);
  httpClientSpy.get.and.returnValue(asyncData(Array<ToDoProject>()));
  // used for testing

  beforeEach(() => {
  });

  beforeEach(async(() => {

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

  it('projects should init to empty list, not null', () => {
    expect(component.projects.length).toEqual(0);
  });

  it('should get projects after init', () => {
    const expectedProjects: ToDoProject[] = [{Id: 3, Name: 'Test3', Owner : 'Jon'}, {Id: 4, Name: 'Test4', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });

  it('should get projects after init async', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 5, Name: 'Test5', Owner : 'Jon'}, {Id: 6, Name: 'Test6', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));

    component.ngOnInit();
    tick(2000);
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  // it('should get projects after init async (using other async claass)', fakeAsync(() => {
  //   const expectedProjects: ToDoProject[] = [{Id: 5, Name: 'Test5', Owner : 'Jon'}, {Id: 6, Name: 'Test6', Owner : 'Jon'}];
  //   // override the existing http spy method with new data
  //   httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));

  //   component.ngOnInit();
  //   tick(2000);
  //   expect(component.projects).toEqual(expectedProjects);
  //   // expect(false).toBeTruthy();
  // }));
});
