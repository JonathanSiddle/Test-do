import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';

import { ToDoItem } from './../../../shared/models/todoItem';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { ToDoList } from '../../../shared/models/todoList';
import { Observable } from 'rxjs';
import { ToDoItemService } from 'src/app/shared/services/toDoItem.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public projectId: number;
  public todoListId: number;
  public todoListToDisplay: ToDoList;

  public sendingData = false;

  constructor(private projectListsService: ProjectListsService,
              private activatedroute: ActivatedRoute,
              private toDoItemService: ToDoItemService) { }

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

  addedNewItem($event: ToDoItem) {
    this.toDoItemService.create($event).subscribe(
      item => {
        console.log('Saved data!');
        this.todoListToDisplay.ListItems.push(item);
      },
      error => {
        console.log('Error saving item');
      }
    );
  }

  editedItem($event: ToDoItem) {
    const editedItem = this.todoListToDisplay.ListItems.find(i => i.id.toString() === $event.id.toString());
    this.toDoItemService.update($event, $event.id).subscribe(
      item => {
        editedItem.Name = item.Name;
        editedItem.Complete = item.Complete;
      },
      error => {
        console.log('Error updating item');
      }
    );
  }

  deleteItem($event: number) {
    const deletedItem = this.todoListToDisplay.ListItems.findIndex(i => i.id.toString() === $event.toString());
    this.toDoItemService.delete($event).subscribe(
      item => {
        console.log('Deleted item');
        this.todoListToDisplay.ListItems.splice(deletedItem, 1);
      },
      error => {
        console.log('Error deleting item');
      }
    );
  }
}
