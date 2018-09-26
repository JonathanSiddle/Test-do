import { ToDoItem } from './../models/todoItem';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';

@Injectable()
export class ToDoItemService extends DataService<ToDoItem> {
    constructor(protected http: HttpClient) {
        super('ListItems', http);
    }
}
