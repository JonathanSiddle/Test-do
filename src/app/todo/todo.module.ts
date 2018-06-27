import { RouterLink, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoProjectListComponent } from './containers/todo-project-list/todo-project-list.component';
import { TodoProjectListViewComponent } from './components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from '../shared/services/projects.service';
import { TodoListComponent } from './containers/todo-list/todo-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    TodoProjectListComponent,
    TodoProjectListViewComponent,
    TodoListComponent
  ],
  exports: [
    TodoProjectListComponent
  ],
  providers: [
    ProjectService
  ]
})
export class TodoModule { }
