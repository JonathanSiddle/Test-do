import { Component, OnInit } from '@angular/core';
import { ToDoList } from '../../../shared/models/todoList';
import { Observable } from 'rxjs';
import { ToDoListService } from '../../../shared/services/todoList.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public toDoList$: Observable<ToDoList>;
  public toDoList: ToDoList;

  constructor(private toDoListService: ToDoListService,
              private _Activatedroute: ActivatedRoute) { }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.params['id'];
    this.toDoList$ = this.toDoListService.getOne(id);
    this.toDoList$.subscribe(
      returnedToDoList => {
        this.toDoList = returnedToDoList;
        // console.dir(this.toDoList);
      },
      error => {
        // do something with this error...
      }
    );
  }

}
