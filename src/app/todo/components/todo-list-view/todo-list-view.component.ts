import { defer } from 'rxjs';
import { ToDoList } from './../../../shared/models/todoList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { existsInListValidator } from '../../../shared/validators/existsInListValidator';
import { ToDoItem } from '../../../shared/models/todoItem';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  public form = new FormGroup({
    'itemName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
  });

  public editingItem: ToDoItem = null;

  @Input() public projectId: number;
  @Input() public toDoList: ToDoList;
  @Output() public addedItem = new EventEmitter<ToDoItem>();
  @Output() public editItem = new EventEmitter<ToDoItem>();
  @Output() public deleteItem = new EventEmitter<number>();

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
      this.clickedAddItem();
    }
  }

  clickedAddItem() {
    // console.dir(this.editingItem);
    // if (this.editingItem != null) {
    //   console.log('Raising edit event');
    //   this.editItem.emit(this.editingItem);
    // } else {
    //   console.log('Adding with id: ' + (this.toDoList.Items.length + 1));
    //   this.addedItem.emit(new ToDoItem(this.toDoList.Items.length + 1, this.itemName.value, false));
    // }

    // this.editingItem = null;
    // this.itemName.setValue('');
    // this.itemName.markAsPristine();
    // this.form.reset();
  }

  clickedCancelButton() {
    this.editingItem = null;
  }

  clickedEditItem(id: number) {
    // this.editingItem = this.toDoList.Items.find(i => i.id.toString() === id.toString());
    // this.itemName.setValue(this.editingItem.Name);
  }

  clickedDeleteItem(itemId: number) {
    this.deleteItem.emit(itemId);
  }
}
