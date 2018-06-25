import { ProjectService } from './../../../shared/services/projects.service';
import { Component, OnInit } from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  public todoProjects = new Array(
    new ToDoProject(1, 'Test Project1', 'Jim'),
    new ToDoProject(2, 'Test Project2', 'Jim'),
    new ToDoProject(3, 'Test Project3', 'Jim'));

  public testName = 'testInput';

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAll().subscribe(
      response => {
        this.todoProjects = response;
      },
      error => {
        console.log('error:' + error);
      }
    );
  }

  clickedButton(input: string) {
  }

}
