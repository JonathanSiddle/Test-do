import { Component, OnInit } from '@angular/core';
import { ProjectLists } from '../../../shared/models/projectLists';
import { Observable } from 'rxjs';
import { ToDoList } from '../../../shared/models/todoList';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-lists',
  templateUrl: './project-lists.component.html',
  styleUrls: ['./project-lists.component.css']
})
export class ProjectListsComponent implements OnInit {

  public projectId: number;
  public toProjectLists$: Observable<ProjectLists>;
  public projectLists: ProjectLists;
  public todoListToDisplay: ToDoList;

  constructor(private projectListsService: ProjectListsService,
    private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this.activatedroute.snapshot.params['id'];
    this.toProjectLists$ = this.projectListsService.getOne(this.projectId);
    this.toProjectLists$.subscribe(
      returnedToDoList => {
        this.projectLists = returnedToDoList;
        this.todoListToDisplay = this.projectLists.Lists[0];
      },
      error => {
      }
    );
  }

}
