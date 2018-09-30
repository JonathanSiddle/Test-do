import { MaterialImportsModule } from './../../../shared/material-imports.module';
import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { TodoProjectListComponent } from './todo-project-list.component';
import { ToDoProject } from '../../../shared/models/todoProject';
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
    httpClientSpy.get.and.returnValue(of(Array<ToDoProject>()));
    httpClientSpy.post.and.returnValue(of(ToDoProject));

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
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    // override the existing http spy method with new data
    httpClientSpy.get.and.returnValue(of(expectedProjects));

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });

  it('should get projects after init async(with delay)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test3', 'Jon', [''], 3, null),
      new ToDoProject('Test4', 'Jon', [''], 4, null),
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
      new ToDoProject('Test5', 'Jon', [''], 5, null),
      new ToDoProject('Test6', 'Jon', [''], 6, null),
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
      new ToDoProject('Test7', 'Jon', [''], 7, null),
      new ToDoProject('Test8', 'Jon', [''], 8, null),
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

  it('should called new project method after child event', () => {
    // set-up
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test9', 'Jon', [''], 9, null),
      new ToDoProject('Test10', 'Jon', [''], 10, null),
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
      new ToDoProject('Test9', 'Jon', [''], 9, null),
      new ToDoProject('Test10', 'Jon', [''], 10, null),
    ];
    const expectedProject = new ToDoProject('testProject', 'Jonathan', [], 3, []);
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
    // expect(false).toBeTruthy();
  });
});
