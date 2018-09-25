import { ProjectListsViewComponent } from './../../components/project-lists-view/project-lists-view.component';
import { ProjectListsService } from './../../../shared/services/projectLists.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDoList } from '../../../shared/models/todoList';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-project-lists',
  templateUrl: './project-lists.component.html',
  styleUrls: ['./project-lists.component.css']
})
export class ProjectListsComponent implements OnInit {

  @ViewChild(ProjectListsViewComponent) projectListView: ProjectListsViewComponent;

  public projectId: number;
  public projectLists: ToDoList[];

  constructor(
    private projectService: ProjectService,
    private activatedroute: ActivatedRoute,
    private projectListService: ProjectListsService) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this.activatedroute.snapshot.params['id'];
    this.projectService.getOne(this.projectId).subscribe(
      returnedProject => {
        this.projectLists = returnedProject.ProjectLists;
        console.dir(this.projectLists);
      },
      error => {
        console.log('Hit error block');
        console.dir(error);
      }
    );
  }

  clickedEditList(listId: number) {
  }

  clickedDeleteList(listId: number) {
    this.projectListService.delete(listId).subscribe(
      deleted => {
        const dpId = this.projectLists.findIndex(p => p.id.toString() === listId.toString());
        console.log('deleted index: ' + dpId);
        if (dpId > -1) {
          this.projectLists.splice(dpId, 1);
          this.projectListView.refreshData();
        }
      },
      error => {
      }
    );
  }

  clickedAddNewList($event: ToDoList) {
    this.projectListService.create($event).subscribe(
      returnedList => {
        this.projectLists.push(returnedList);
        this.projectListView.refreshData();
      },
      error => {
        console.dir(error);
      }
    );
  }
}
