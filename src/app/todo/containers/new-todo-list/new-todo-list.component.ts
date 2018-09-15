import { ProjectListsService } from './../../../shared/services/projectLists.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToDoList } from '../../../shared/models/todoList';

@Component({
  selector: 'app-new-todo-list',
  templateUrl: './new-todo-list.component.html',
  styleUrls: ['./new-todo-list.component.css']
})
export class NewTodoListComponent implements OnInit {

  public projectId: number;
  public projectLists: ToDoList;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private projectListsService: ProjectListsService
  ) { }

  ngOnInit() {
    // console.log('Trying to get project lists');
    // this.projectId = this._Activatedroute.snapshot.params['id'];
    // this.projectListsService.getOne(this.projectId).subscribe(
    //   returnedToDoList => {
    //     console.log('got response (new list)');
    //     console.dir(returnedToDoList);
    //     this.projectLists = returnedToDoList;
    //   },
    //   error => {
    //   }
    // );
  }

  // updateDisplayList(id: number) {
  //   const listToDisplay = this.projectLists.Lists.find(l => l.id === id);
  //   console.log('list to display');
  //   console.dir(listToDisplay);
  //   return () => {
  //     console.log('calling callback function');
  //     console.dir(listToDisplay);
  //     // this.todoListToDisplay = listToDisplay;
  //   };
  // }
}
