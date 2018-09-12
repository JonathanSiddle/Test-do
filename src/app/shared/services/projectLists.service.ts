import { ToDoList } from './../models/todoList';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectListsService extends DataService<ToDoList> {
    constructor(protected http: HttpClient) {
        super('ProjectLists', http);
    }
}
