import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoProjectListComponent } from './containers/todo-project-list/todo-project-list.component';
import { TodoProjectListViewComponent } from './components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from '../shared/services/projects.service';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { ToDoListService } from '../shared/services/todoList.service';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';
import { FormsModule } from '../../../node_modules/@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    TodoProjectListComponent,
    TodoProjectListViewComponent,
    TodoListComponent,
    TodoListViewComponent
  ],
  exports: [
    TodoProjectListComponent
  ],
  providers: [
    ProjectService,
    ToDoListService
  ]
})
export class TodoModule { }
