import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ToDoList } from '../../../shared/models/todoList';
import { Observable } from 'rxjs';
import { ToDoListService } from '../../../shared/services/todoList.service';
import { ActivatedRoute } from '@angular/router';
import { SideBarContentService } from '../../../shared/services/sidebarContentService.service';
import { SideBarItem } from '../../../shared/SideBarContent';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  private sideBarNav = Array<SideBarItem>(
    new SideBarItem('To Do list Specific', 'An item set from to do list', 'App/SharedProjects')
  );

  public toDoList$: Observable<ToDoList>;
  public toDoList: ToDoList;

  constructor(private toDoListService: ToDoListService,
              private _Activatedroute: ActivatedRoute,
              private sidebarContentService: SideBarContentService) { }

  ngOnInit() {
    const id = this._Activatedroute.snapshot.params['id'];
    this.toDoList$ = this.toDoListService.getOne(id);
    this.toDoList$.subscribe(
      returnedToDoList => {
        this.toDoList = returnedToDoList;
        // console.dir(this.toDoList);
      },
      error => {
        // do something with this error...
      }
    );
    this.sideBarNav.push(new SideBarItem('Specific to this list', 'specific to list' + id, 'App/SharedProjects'));
  }

  ngAfterViewChecked() {
    this.sidebarContentService.sideBarItems = this.sideBarNav;
  }

}
