import { ToDoList } from './../models/todoList';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectListsService extends DataService<ToDoList> {

    public dataService: DataService<ToDoList>;

    constructor(protected http: HttpClient) {
        super('ProjectLists', http);
    }

    // getAll(): Observable<Array<ToDoList>> {
    //     return this.dataService.getAll();
    // }

    // getOne(id: number): Observable<ToDoList> {
    //     return this.dataService.getOne(id);
    // }

    // create(resource: ToDoList): Observable<ToDoList> {
    //     return this.dataService.create(resource);
    // }

    // update(resource: ToDoList, rId: number): Observable<ToDoList> {
    //     return this.dataService.update(resource, rId);
    // }

    // delete(id: number): Observable<ToDoList> {
    //     return this.dataService.delete(id);
    // }
}
