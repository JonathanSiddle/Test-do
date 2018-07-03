import { ToDoList } from './../../../shared/models/todoList';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  @Input() public toDoList: ToDoList = new ToDoList();

  constructor() { }

  ngOnInit() {
  }

}
