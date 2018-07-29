import { ToDoItem } from './../../../shared/models/todoItem';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { ProjectLists } from './../../../shared/models/projectLists';
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
  public toProjectLists$: Observable<ProjectLists>;
  public projectLists: ProjectLists;
  public todoListToDisplay: ToDoList;

  constructor(private projectListsService: ProjectListsService,
              private _Activatedroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this._Activatedroute.snapshot.params['id1'];
    this.todoListId = this._Activatedroute.snapshot.params['id2'];
    console.log(this.projectId + ',' + this.todoListId);
    this.toProjectLists$ = this.projectListsService.getOne(this.projectId);
    this.toProjectLists$.subscribe(
      returnedToDoList => {
        this.projectLists = returnedToDoList;
        console.log('got list!');
        const lists = this.projectLists.Lists;
        // TODO: fix why === does not work with numbers, at least all vars seem to be numbers
        this.todoListToDisplay = lists.find(tl => tl.id.toString() === this.todoListId.toString());
      },
      error => {
        console.log('Hit to do list error block');
      }
    );
  }

  addedNewItem($event: ToDoItem) {
    const todoList = this.projectLists.Lists.find(l => l.id.toString() === this.todoListId.toString());
    todoList.Items.push($event);

    this.updateProjectList();
  }

  editedProject($event: ToDoItem) {
    console.dir($event);
  }

  deletedItem($event: number) {
    const todoList = this.projectLists.Lists.find(l => l.id.toString() === this.todoListId.toString());
    this.todoListToDisplay.Items = todoList.Items.filter(i => i.id.toString() !== $event.toString());

    this.updateProjectList();
  }

  updateProjectList() {
    this.toProjectLists$ = this.projectListsService.update(this.projectLists, this.projectId);
    this.toProjectLists$.subscribe(
      updatedProjectLists => {
        console.log('updated project list');
        console.dir(updatedProjectLists);
        // set project list to the server value
        this.projectLists = updatedProjectLists;
        this.todoListToDisplay = this.projectLists.Lists.find(l => l.id.toString() === this.todoListId.toString());
      },
      error => {
        console.log('Hit error');
        console.dir(error);
      }
    );
  }


}
