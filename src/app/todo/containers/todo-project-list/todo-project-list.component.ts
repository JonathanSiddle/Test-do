import { SideBarItem } from './../../../shared/SideBarContent';
import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { Observable } from 'rxjs';
import { ProjectService } from './../../../shared/services/projects.service';
import { Component, OnInit, , EventEmitter, Output, ViewChild } from '@angular/core';
import { ToDoProject, getListOfTagsForProjects } from '../../../shared/models/todoProject';
import { SideBarContentService } from '../../../shared/services/sidebarContentService.service';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  private sideBarNav = Array<SideBarItem>(
    new SideBarItem('Shared Projects', 'Projects I do not own', 'App/SharedProjects')
  );

  @ViewChild(TodoProjectListViewComponent) projectListView: TodoProjectListViewComponent;
  @Output() sideBarItemsReady = new EventEmitter<SideBarItem[]>();
  public SideBarContent: SideBarItem[] = [];
  public projects: ToDoProject[] = [];
  public addedProject: ToDoProject;

  constructor(private sideBarContentService: SideBarContentService, private projectService: ProjectService) {
     this.projects = [];
  }

  ngOnInit() {
    // this.projects$ = this.projectService.getAll();
    this.projectService.getAll().subscribe(
      returnedProjects => {
        // console.log('Got projects');
        this.projects = returnedProjects;
        this.SideBarContent = this.generateSideBarContent(this.projects);
        this.raiseSidebarEvent(this.SideBarContent);
      },
      error => {
        // console.log('error:' + error);
      }
    );
  }

  ngAfterViewInit() {
    console.log('setting sidebar content from project-list');
    this.sideBarContentService.setSideBarContent(this.sideBarNav);
  }

  addedNewProject(event) {
    const addIndex = this.projects.length + 1;
    const newProj = new ToDoProject(addIndex, event, 'Jonathan');
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

  generateSideBarContent(projects: Array<ToDoProject>): SideBarItem[]   {
    const projectTags = getListOfTagsForProjects(projects);
    const content: SideBarItem[] = [];
    for (const tag of projectTags) {
      content.push(new SideBarItem(tag, ''));
    }
    return content;
  }

  raiseSidebarEvent(items: SideBarItem[]) {
    this.sideBarItemsReady.emit(items);
  }
}
