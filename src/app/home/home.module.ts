import { TodoModule } from './../todo/todo.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TodoModule
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
  ]
})
export class HomeModule { }
