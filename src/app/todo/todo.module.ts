import { ProjectListsService } from './../shared/services/projectLists.service';
import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoProjectListComponent } from './containers/todo-project-list/todo-project-list.component';
import { TodoProjectListViewComponent } from './components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from '../shared/services/projects.service';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { SharedProjectListComponent } from './containers/shared-project-list/shared-project-list.component';
import { NewTodoListComponent } from './containers/new-todo-list/new-todo-list.component';
import { ProjectListsComponent } from './containers/project-lists/project-lists.component';
import { ProjectListsViewComponent } from './components/project-lists-view/project-lists-view.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoProjectListComponent,
    TodoProjectListViewComponent,
    TodoListComponent,
    TodoListViewComponent,
    SharedProjectListComponent,
    NewTodoListComponent,
    ProjectListsComponent,
    ProjectListsViewComponent
  ],
  exports: [
    TodoProjectListComponent
  ],
  providers: [
    ProjectService,
    ProjectListsService
  ]
})
export class TodoModule { }
