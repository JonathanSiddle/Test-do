import { MaterialImportsModule } from './../../../shared/material-imports.module';
import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { TodoProjectListComponent } from './todo-project-list.component';
import { ToDoProject } from '../../../shared/models/todoProject';
import { asyncData } from '../../../../testing/shared/async-observable-helpers';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

// @Component({
//   selector: 'app-todo-project-list-view',
//   template: '<p>Mock project list-view component</p>'
// })
// class MockProjectListViewComponent {
//   @Input() public projects: Array<ToDoProject>;
// }


@Component({
    selector: 'app-todo-project-list-view',
    template: '<p>Mock project list-view component</p>'
  })
export class MockProjectListViewComponent extends TodoProjectListViewComponent {
    constructor() {
       super();
  }
}


describe('TodoProjectListComponent', () => {

  let component: TodoProjectListComponent;
  let childComponent: MockProjectListViewComponent;
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
      declarations: [ TodoProjectListComponent, MockProjectListViewComponent ],
      providers: [
        {provide: ProjectService, useValue: projectServiceTest}
      ],
      // providers: [{provide: ProjectService, useValue: projectServiceTest}],
      schemas: [] // used to avoid errors with dependencies, i.e. child component
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TodoProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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

  it('should set property of child component', () => {
    const expectedProjects: ToDoProject[] = [{Id: 7, Name: 'Test7', Owner : 'Jon'}, {Id: 8, Name: 'Test8', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;
    fixture.detectChanges();

    expect(component.projects).toEqual(expectedProjects);
    expect(childComponent.projects).toEqual(expectedProjects);
  });

  // Async tests
  it('should get projects after init async', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 5, Name: 'Test5', Owner : 'Jon'}, {Id: 6, Name: 'Test6', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
    console.dir(component.projects);

    component.ngOnInit();
    tick(2000);
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should only have child component after setting projects in host (async)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 5, Name: 'Test5', Owner : 'Jon'}, {Id: 6, Name: 'Test6', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
    console.dir(component.projects);

    component.ngOnInit();
    tick(2000);
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  // it('should only have child component after setting projects in host (async)', fakeAsync(() => {
  //   fixture.detectChanges();
  //   const expectedProjects: ToDoProject[] = [{Id: 9, Name: 'Test5', Owner : 'Jon'}, {Id: 10, Name: 'Test6', Owner : 'Jon'}];
  //   // override the existing http spy method with new data
  //   httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
  //   component.ngOnInit();

  //   fixture.whenStable().then(() => {
  //     const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
  //     childComponent = childDebugEl.componentInstance;
  //     // child projects empty
  //     expect(childComponent.projects).toEqual([]);
  //     // check host to make sure element is not displayed
  //     const htmlElement: HTMLElement = fixture.nativeElement;
  //     console.log(htmlElement.textContent);
  //     console.log('Printing projects from stable!!');
  //     console.dir(component.projects);
  //   });

  //   // const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
  //   // childComponent = childDebugEl.componentInstance;
  //   // // child projects empty
  //   // expect(childComponent.projects).toEqual([]);
  //   // // check host to make sure element is not displayed
  //   // const htmlElement: HTMLElement = fixture.nativeElement;
  //   // console.log(htmlElement.textContent);
  //   // console.dir(component.projects);

  //   // component.ngOnInit();
  //   // tick(2000);
  //   // console.dir(component.projects);
  //   // expect(component.projects).toEqual(expectedProjects);
  //   expect(false).toBeTruthy();
  // }));
});
