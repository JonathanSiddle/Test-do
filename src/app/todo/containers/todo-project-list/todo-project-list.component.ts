import { Component, OnInit } from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  public todoProjects = new Array(
    new ToDoProject('Test Project1'),
    new ToDoProject('Test Project2'),
    new ToDoProject('Test Project3'));;

  public testName = 'testInput';

  constructor() { }

  ngOnInit() {
  }

  clickedButton(input: string) {
  }

}
