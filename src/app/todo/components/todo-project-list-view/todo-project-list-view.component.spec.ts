import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProjectListViewComponent } from './todo-project-list-view.component';
import { MaterialImportsModule } from '../../../shared/material-imports.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
    template: ''
})
export class NavigatedComponent {
}

export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of('projectNameTest')
    };
  }
}

describe('TodoProjectListViewComponent', () => {
  let component: TodoProjectListViewComponent;
  let fixture: ComponentFixture<TodoProjectListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialImportsModule, RouterTestingModule.withRoutes([
        { path: '', redirectTo: 'App/Projects', pathMatch: 'full' },
        { path: 'App/Projects', component: TodoProjectListViewComponent },
        { path: 'App/Todo/:id', component: NavigatedComponent }
       ]) ],
       providers: [{provide: MatDialog, useClass: MdDialogMock}],
      declarations: [ TodoProjectListViewComponent, NavigatedComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a link for each project in list', () => {
    const expectedProjects: ToDoProject[] = [
                    {Id: 1, Name: 'Test1', Owner : 'Jon'},
                    {Id: 2, Name: 'Test2', Owner : 'Jon'}];
    component.ngOnInit();
    component.projects = expectedProjects;
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement;
    const links = htmlElement.getElementsByTagName('a');

    expect(links.length).toBe(2);
    // console.log(links.item(0).textContent);
    // console.log(links.item(0).href);
    expect(links.item(0).textContent.trim()).toBe('Test1');
    expect(links.item(0).href.endsWith('App/Todo/1')).toBeTruthy();
    expect(links.item(1).textContent.trim()).toBe('Test2');
    expect(links.item(1).href.endsWith('App/Todo/2')).toBeTruthy();

    // expect(false).toBeTruthy();
  });

  it('should raise event when clickedAddNewProject is called and dialog returns values', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const raiseEventSpy = spyOn(component, 'raiseAddedProjectEvent');

    component.clickedAddNewProject();

    expect(raiseEventSpy).toHaveBeenCalled();
    expect(raiseEventSpy).toHaveBeenCalledTimes(1);
    expect(raiseEventSpy).toHaveBeenCalledWith('projectNameTest');
    // expect(false).toBeTruthy();
  });
});
