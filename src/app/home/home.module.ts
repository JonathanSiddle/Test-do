import { TodoModule } from './../todo/todo.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { TodoProjectListComponent } from '../todo/containers/todo-project-list/todo-project-list.component';
import { TodoListComponent } from '../todo/containers/todo-list/todo-list.component';

const routes: Routes = [
  {path: 'App/todo:id', component: TodoListComponent},
  {path: 'App/Projects', component: TodoProjectListComponent},
  {path: 'App', redirectTo: 'App/Projects', pathMatch: 'full'},
  {path: '**', redirectTo: 'App/Projects', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    TodoModule
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
    RouterModule
  ]
})
export class HomeModule { }
