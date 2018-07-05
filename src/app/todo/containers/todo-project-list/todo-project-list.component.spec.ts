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
  let httpClientSpy: { get: jasmine.Spy };

  // SET UP
  beforeEach(async(() => {
    // set up project service with fake http client
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    let projectServiceTest: ProjectService;
    projectServiceTest = new ProjectService(<any>httpClientSpy);
    httpClientSpy.get.and.returnValue(asyncData(Array<ToDoProject>()));

    TestBed.configureTestingModule({
      declarations: [ TodoProjectListComponent, MockProjectListViewComponent ],
      providers: [
        {provide: ProjectService, useValue: projectServiceTest}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TESTS
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('projects should init to empty list, not null', () => {
    expect(component.projects.length).toEqual(0);
  });

  it('should get projects after init', () => {
    const expectedProjects: ToDoProject[] = [{Id: 1, Name: 'Test1', Owner : 'Jon'}, {Id: 2, Name: 'Test2', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });

  it('should get projects after init async(with delay)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 3, Name: 'Test3', Owner : 'Jon'}, {Id: 4, Name: 'Test4', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
    // make sure projects start out empty
    expect(component.projects).toEqual([]);
    // console.dir(component.projects);

    component.ngOnInit();
    tick(2000);
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should set property of child component', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 5, Name: 'Test5', Owner : 'Jon'}, {Id: 6, Name: 'Test6', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    // console.log('should set property of child component');
    // console.dir(component.projects);
    expect(component.projects).toEqual([]);

    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;

    expect(component.projects).toEqual(expectedProjects);
    expect(childComponent.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should only create child component after setting projects in host (async)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [{Id: 7, Name: 'Test7', Owner : 'Jon'}, {Id: 8, Name: 'Test8', Owner : 'Jon'}];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));

    component.ngOnInit();
    fixture.detectChanges();
    expect(component.projects).toEqual([]);

    const htmlElement: HTMLElement = fixture.nativeElement;
    expect(htmlElement.textContent).toEqual('');
    tick(2000);
    fixture.detectChanges();
    expect(htmlElement.textContent).toEqual('Mock project list-view component');
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));
});
