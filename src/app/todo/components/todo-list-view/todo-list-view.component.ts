import { defer } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToDoList } from './../../../shared/models/todoList';
import { existsInListValidator } from '../../../shared/validators/existsInListValidator';
import { ToDoItem } from '../../../shared/models/todoItem';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  @Input() public projectId: number;
  @Input() public toDoList: ToDoList;

  @Output() public addedItem = new EventEmitter<ToDoItem>();
  @Output() public editItem = new EventEmitter<ToDoItem>();
  @Output() public deleteItem = new EventEmitter<number>();

  public form = new FormGroup({
    'itemName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
  });
  public editingItem: ToDoItem = null;

  constructor() { }

  ngOnInit() {
    console.dir(this.toDoList);

    this.itemName.setValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      existsInListValidator(this.toDoList.ListItems.map(i => i.Name.trim()))
    ]);
    console.dir(this.toDoList);
  }

  get itemName() {
    return this.form.get('itemName');
  }

  get isFormValid() {
    return this.itemName.dirty && this.itemName.valid;
  }

  enterkeyPressed() {
    if (this.isFormValid) {
      this.clickedSave();
    }
  }

  clickedSave() {
    if (this.editingItem) {
      // create new item then update when
      // confirmed with server
      const newEditItem = new ToDoItem(
        this.itemName.value,
        this.editingItem.Complete,
        this.editingItem.ProjectListId,
        this.editingItem.id);

        console.log('Raising edit event');
        this.editItem.emit(newEditItem);
    } else {
      const newItem = new ToDoItem(this.itemName.value, false, this.projectId);

      console.log('Raising new event');
      this.addedItem.emit(newItem);
    }
  }

  clickedCancelButton() {
    this.editingItem = null;
    this.itemName.reset();
  }

  clickedEditItem(id: number) {
    this.editingItem = this.toDoList.ListItems.find(i => i.id.toString() === id.toString());
    this.itemName.setValue(this.editingItem.Name);
  }

  clickedDeleteItem(itemId: number) {
    this.deleteItem.emit(itemId);
  }
}
