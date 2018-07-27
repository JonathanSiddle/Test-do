import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectLists } from '../models/projectLists';

@Injectable()
export class ProjectListsService extends DataService<ProjectLists> {
    constructor(protected http: HttpClient) {
        super('ProjectLists', http);
    }
}
