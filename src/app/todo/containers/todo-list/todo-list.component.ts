import { Component, OnInit } from '@angular/core';
import { ToDoList } from '../../../shared/models/todoList';
import { Observable } from 'rxjs';
import { ToDoListService } from '../../../shared/services/todoList.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public toDoList$: Observable<ToDoList>;
  public toDoList: ToDoList;

  constructor(private toDoListService: ToDoListService) { }

  ngOnInit() {
    this.toDoList$ = this.toDoListService.getOne(1);
    this.toDoList$.subscribe(
      returnedToDoList => {
        this.toDoList = returnedToDoList;
      },
      error => {
        // do something with this error...
      }
    );
  }

}
