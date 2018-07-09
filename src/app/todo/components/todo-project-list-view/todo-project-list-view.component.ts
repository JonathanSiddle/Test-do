import { NewProjectDialogComponent } from './../../../shared/dialogs/new-project-dialog/new-project-dialog.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import { ToDoProject } from '../../../shared/models/todoProject';
import { MatDialog, MatTable } from '@angular/material';

@Component({
  selector: 'app-todo-project-list-view',
  templateUrl: './todo-project-list-view.component.html',
  styleUrls: ['./todo-project-list-view.component.css']
})
export class TodoProjectListViewComponent implements OnInit {

  @ViewChild(MatTable) matTable: MatTable<ToDoProject>;
  @Input() public projects: Array<ToDoProject>;
  @Output() addedProject = new EventEmitter<string>();
  public displayedColumns = ['Name', 'Owner'];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  clickedAddNewProject() {
    // this.dialog.open(NewProjectDialogComponent, {data: {cProject: this.selectedProject}}).afterClosed().subscribe(
    this.dialog.open(NewProjectDialogComponent, {data: this.projects}).afterClosed().subscribe(
      projectName => {
        // console.log(projectName);
        if (projectName != null) {
          this.raiseAddedProjectEvent(projectName);
        }
      }
    );
  }

  refreshData() {
    console.log('called refresh data');
    this.matTable.renderRows();
  }

  raiseAddedProjectEvent(projName: string) {
    this.addedProject.emit(projName);
  }
}
