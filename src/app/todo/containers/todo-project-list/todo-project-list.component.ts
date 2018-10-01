import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from './../../../shared/services/projects.service';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  @ViewChild(TodoProjectListViewComponent) projectListView: TodoProjectListViewComponent;
  public projects: ToDoProject[] = [];

  constructor(public projectService: ProjectService) {
     this.projects = [];
  }

  ngOnInit() {
    // this.projects$ = this.projectService.getAll();
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

  addedNewProject($event: string) {
    const newProj = new ToDoProject($event, 'Jonathan');
    console.log(newProj);
    // this.addedProject$ = this.projectService.create(new ToDoProject(addIndex, event, 'Jonathan'));
    this.projectService.create(newProj).subscribe(
      returnedProjects => {
        console.log('Got projects');
        this.projects.push(returnedProjects);
        this.projectListView.refreshData();
      },
      error => {
        console.dir(error);
      }
    );
  }

  editedProject($event: ToDoProject) {
    this.projectService.update($event, $event.id).subscribe(
      editedProject => {
        const proj = this.projects.find(p => p.id.toString() === editedProject.id.toString());
        proj.Name = editedProject.Name;
        proj.Owner = editedProject.Owner;
        this.projectListView.refreshData();
      },
      error => {
      }
    );
  }

  deletedProject($event: number) {
    this.projectService.delete($event).subscribe(
      deletedProject => {
        const dpId = this.projects.findIndex(p => p.id.toString() === $event.toString());
        console.log('deleted index: ' + dpId);
        if (dpId > -1) {
          this.projects.splice(dpId, 1);
        }
        this.projectListView.refreshData();
      },
      error => {
      }
    );
  }
}
