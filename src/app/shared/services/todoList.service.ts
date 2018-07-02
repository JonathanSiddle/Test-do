import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToDoList } from '../models/todoList';

@Injectable()
export class ToDoListService extends DataService<ToDoList> {
    constructor(protected http: HttpClient) {
        super('ToDoLists', http);
    }
}
