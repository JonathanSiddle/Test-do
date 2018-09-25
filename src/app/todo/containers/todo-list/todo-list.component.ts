import { ToDoItem } from './../../../shared/models/todoItem';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { ToDoList } from '../../../shared/models/todoList';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public projectId: number;
  public todoListId: number;
  public todoListToDisplay: ToDoList;

  constructor(private projectListsService: ProjectListsService,
              private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this.activatedroute.snapshot.params['id1'];
    this.todoListId = this.activatedroute.snapshot.params['id2'];
    console.log(this.projectId + ',' + this.todoListId);
    this.projectListsService.getOne(this.todoListId).subscribe(
      returnedToDoList => {
        console.log('Got todo list!');
        console.dir(returnedToDoList);

        this.todoListToDisplay = returnedToDoList;
      },
      error => {
        console.log('Hit to do list error block');
      }
    );
  }

  // addedNewItem($event: ToDoItem) {
  //   todoList.Items.push($event);

  //   this.updateProjectList();
  // }

  // editedProject($event: ToDoItem) {
  //   console.dir($event);
  // }

  // deletedItem($event: number) {
  //   const todoList = this.projectLists.Lists.find(l => l.id.toString() === this.todoListId.toString());
  //   this.todoListToDisplay.Items = todoList.Items.filter(i => i.id.toString() !== $event.toString());

  //   this.updateProjectList();
  // }

  // updateProjectList() {
  //   this.toProjectLists$ = this.projectListsService.update(this.projectLists, this.projectId);
  //   this.toProjectLists$.subscribe(
  //     updatedProjectLists => {
  //       console.log('updated project list');
  //       console.dir(updatedProjectLists);
  //       // set project list to the server value
  //       this.projectLists = updatedProjectLists;
  //       this.todoListToDisplay = this.projectLists.Lists.find(l => l.id.toString() === this.todoListId.toString());
  //     },
  //     error => {
  //       console.log('Hit error');
  //       console.dir(error);
  //     }
  //   );
  // }


}
