import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoProjectListComponent } from './containers/todo-project-list/todo-project-list.component';
import { TodoProjectListViewComponent } from './components/todo-project-list-view/todo-project-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    TodoProjectListComponent,
    TodoProjectListViewComponent
  ],
  exports: [
    TodoProjectListComponent
  ]
})
export class TodoModule { }
