import { TodoProjectListComponent } from './../todo/containers/todo-project-list/todo-project-list.component';
import { TodoModule } from './../todo/todo.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from '../todo/containers/todo-list/todo-list.component';

const routes: Routes = [
  {path: 'App/Todo', component: TodoListComponent},
  {path: 'App/Projects', component: TodoProjectListComponent},
  {path: '', redirectTo: 'App/Projects', pathMatch: 'full'},
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { enableTracing: true } ),
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
