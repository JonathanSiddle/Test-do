import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoProjectListViewComponent } from './todo-project-list-view.component';
import { MaterialImportsModule } from '../../../shared/material-imports.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

@Component({
    template: ''
})
class NavigatedComponent {
}

describe('TodoProjectListViewComponent', () => {


  let component: TodoProjectListViewComponent;
  let fixture: ComponentFixture<TodoProjectListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialImportsModule, RouterTestingModule.withRoutes([
        { path: 'App/Todo/:id', component: NavigatedComponent }
       ]) ],
      declarations: [ TodoProjectListViewComponent ],
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
});
