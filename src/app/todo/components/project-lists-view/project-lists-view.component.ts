import { ToDoList } from './../../../shared/models/todoList';
import { Component, OnInit, Input } from '@angular/core';
import { ProjectLists } from '../../../shared/models/projectLists';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-lists-view',
  templateUrl: './project-lists-view.component.html',
  styleUrls: ['./project-lists-view.component.css']
})
export class ProjectListsViewComponent implements OnInit {

  @Input() projectLists: ToDoList[];
  public projectId: number;
  public displayedColumns = ['Name', 'Owner'];

  constructor(private activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.projectId = this.activatedroute.snapshot.params['id'];
  }
}
