import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../../shared/models/todoList';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-project-lists',
  templateUrl: './project-lists.component.html',
  styleUrls: ['./project-lists.component.css']
})
export class ProjectListsComponent implements OnInit {

  public projectId: number;
  public projectLists: ToDoList[];

  constructor(
    private projectService: ProjectService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this.activatedroute.snapshot.params['id'];
    this.projectService.getOne(this.projectId).subscribe(
      returnedProject => {
        console.dir(returnedProject);
        this.projectLists = returnedProject.ProjectLists;
      },
      error => {
        console.log('Hit error block');
        console.dir(error);
      }
    );
  }

  clickedEditProject(projId: number) {
  }

  clickedDeleteProject(projId: number) {
  }

  clickedAddNewProject(projId: number) {
  }
}
