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
       super(null);
    }
}

describe('TodoProjectListComponent', () => {

  let component: TodoProjectListComponent;
  let childComponent: MockProjectListViewComponent;
  let fixture: ComponentFixture<TodoProjectListComponent>;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy };

  // SET UP
  beforeEach(async(() => {
    // set up project service with fake http client
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    let projectServiceTest: ProjectService;
    projectServiceTest = new ProjectService(<any>httpClientSpy);
    httpClientSpy.get.and.returnValue(asyncData(Array<ToDoProject>()));
    httpClientSpy.post.and.returnValue(asyncData(ToDoProject));

    TestBed.configureTestingModule({
      declarations: [ TodoProjectListComponent, MockProjectListViewComponent],
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
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(1, 'Test1', 'Jon', [''], null),
      new ToDoProject(2, 'Test2', 'Jon', [''], null),
    ];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });

  it('should get projects after init async(with delay)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(3, 'Test3', 'Jon', [''], null),
      new ToDoProject(4, 'Test4', 'Jon', [''], null),
    ];
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
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(5, 'Test5', 'Jon', [''], null),
      new ToDoProject(6, 'Test6', 'Jon', [''], null),
    ];
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
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(7, 'Test7', 'Jon', [''], null),
      new ToDoProject(8, 'Test8', 'Jon', [''], null),
    ];
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

  it('should called new project method after child fires event', () => {
    // set-up
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(9, 'Test9', 'Jon', [''], null),
      new ToDoProject(10, 'Test10', 'Jon', [''], null),
    ];
    httpClientSpy.get.and.returnValue(of(expectedProjects));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;

    // testy stuff
    const componentSpy = spyOn(component, 'addedNewProject');
    childComponent.raiseAddedProjectEvent('testProject');

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith('testProject');
    // expect(false).toBeTruthy();
  });

  it('should send new Project to server and refresh data when addNewProject called', () => {
    // set-up
    const expectedProjects: ToDoProject[] = [
      new ToDoProject(9, 'Test9', 'Jon', [''], null),
      new ToDoProject(10, 'Test10', 'Jon', [''], null),
    ];
    const expectedProject = new ToDoProject(3, 'testProject', 'Jonathan');
    httpClientSpy.get.and.returnValue(of(expectedProjects));
    httpClientSpy.post.and.returnValue(of(expectedProject));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;
    // const ProjectServiceSpy = spyOn(component.p, 'refreshData');

    // testy stuff
    const componentSpy = spyOn(childComponent, 'refreshData');
    component.projectListView = childComponent;
    component.addedNewProject('testProject');

    expect(httpClientSpy.post).toHaveBeenCalled();
    // possibly test data here
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    // expect(componentSpy).toHaveBeenCalledWith(expectedProject);
    // expect(false).toBeTruthy();
  });
});
