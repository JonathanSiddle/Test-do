import { ToDoProject } from './../models/todoProject';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectService extends DataService<ToDoProject> {
    constructor(protected http: HttpClient) {
        super('projects', http);
    }
}
