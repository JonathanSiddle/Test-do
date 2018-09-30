import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { ToDoList } from './../../../shared/models/todoList';
import { ProjectListsViewComponent } from './project-lists-view.component';
import { MaterialImportsModule } from 'src/app/shared/material-imports.module';
import { ProjectDialogData } from 'src/app/shared/dialogs/new-project-dialog/projectDialogData';
import { ToDoItem } from 'src/app/shared/models/todoItem';
import { of } from 'rxjs/internal/observable/of';



let returnData = new ProjectDialogData(null, 'List', false);

export class MdDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(returnData)
    };
  }
}

describe('ProjectListsViewComponent', () => {
  let component: ProjectListsViewComponent;
  let fixture: ComponentFixture<ProjectListsViewComponent>;
  let dialog: MdDialogMock;

  const projectListData = new ToDoList('TestList', 'Jon', 1, 1, new Array<ToDoItem>(
    new ToDoItem('Item1', false, 1, 1),
    new ToDoItem('Item2', false, 1, 2),
    new ToDoItem('Item3', false, 1, 3),
  ));

  beforeEach(async(() => {
    dialog = new MdDialogMock();

    TestBed.configureTestingModule({
      imports: [MaterialImportsModule, RouterTestingModule],
      providers: [{provide: MatDialog, useValue: dialog}],
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
    console.log('Hit should create for: ProjectListsViewComponent');
    expect(component).toBeTruthy();
  });

  it('should create link for each project list', () => {
    expect(false).toBeTruthy();
  });

  it('should raise event when adding new project and got value from dialog', () => {
    expect(false).toBeTruthy();
  });

  it('should NOT raise event when adding new project and did NOT get value from dialog', () => {
    expect(false).toBeTruthy();
  });

  it('should raise event when adding new project and got value from dialog', () => {
    expect(false).toBeTruthy();
  });

  it('should NOT raise event when adding new project and did NOT get value from dialog', () => {
    expect(false).toBeTruthy();
  });
});
