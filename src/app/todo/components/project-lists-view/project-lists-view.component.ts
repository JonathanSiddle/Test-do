import { ToDoProject } from './../../../shared/models/todoProject';
import { ToDoList } from './../../../shared/models/todoList';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-lists-view',
  templateUrl: './project-lists-view.component.html',
  styleUrls: ['./project-lists-view.component.css']
})
export class ProjectListsViewComponent implements OnInit {

  @Input() projectLists: ToDoList[];
  public projectId: number;
  public displayedColumns = ['Name', 'Owner', 'Edit'];

  public addedNewProject = new EventEmitter<ToDoProject>()
  public editedProject = new EventEmitter<ToDoProject>()
  public deletedProject = new EventEmitter<number>()

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.activatedroute.snapshot.params['id'];
  }

  clickedEditProject(projId: number) {
    const project = this.projectLists.find(p => p.id.toString() === projId.toString());
    // this.editedProject.emit(project);
  }

  clickedDeleteProject(projId: number) {
  }

  clickedAddNewProject(projId: number) {
  }
}
