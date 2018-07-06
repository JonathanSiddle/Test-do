import { Observable } from 'rxjs';
import { ProjectService } from './../../../shared/services/projects.service';
import { Component, OnInit } from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  public projects$: Observable<ToDoProject[]>;
  public projects: ToDoProject[] = [];

  constructor(private projectService: ProjectService) {
     this.projects = [];
  }

  ngOnInit() {
    this.projects$ = this.projectService.getAll();
    this.projectService.getAll().subscribe(
      returnedProjects => {
        // console.log('Got projects');
        this.projects = returnedProjects;
      },
      error => {
        // console.log('error:' + error);
      }
    );
  }

  addedNewProject(event) {
    console.log('In added new project method!');
    console.log(event);
  }
}
