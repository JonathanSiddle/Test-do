import { ToDoList } from './../../../shared/models/todoList';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { existsInListValidator } from '../../../shared/services/existsInListValidator';
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

  @Input() public projectId: number;
  @Input() public toDoList: ToDoList;
  @Output() public addedItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.itemName.setValidators([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
      existsInListValidator(this.toDoList.Items.map(i => i.Name.trim()))
    ]);
  }

  get itemName() {
    return this.form.get('itemName');
  }

  get isFormValid() {
    return this.itemName.dirty && this.itemName.valid;
  }

  clickedAddItem() {
    // console.log('raising event');
    this.toDoList.Items.push(new ToDoItem(this.toDoList.Items.length + 1, this.itemName.value, false));
    this.addedItem.emit(this.toDoList);
  }
}
