import { Component, OnInit, Input } from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list-view',
  templateUrl: './todo-project-list-view.component.html',
  styleUrls: ['./todo-project-list-view.component.css']
})
export class TodoProjectListViewComponent implements OnInit {

  @Input() public projects: Array<ToDoProject>;
  public displayedColumns = ['Name', 'Owner'];

  constructor() { }

  ngOnInit() {
  }

}
