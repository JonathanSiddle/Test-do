import { Component, OnInit, Inject } from '@angular/core';
import { ToDoProject } from '../../models/todoProject';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectDialogData } from './projectDialogData';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-new-project-dialog',
  templateUrl: './new-project-dialog.component.html',
  styleUrls: ['./new-project-dialog.component.css']
})
export class NewProjectDialogComponent implements OnInit {

  public projectList = Array<ToDoProject>();
  public projectName = '';

  get isValid() {
    return (this.projectName.trim().length > 0 && 
      this.projectList.filter(tdp => tdp.Name.trim() === this.projectName.trim()).length === 0);
  }

  constructor(public dialogRef: MatDialogRef<NewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDoProject[]) { 
      this.projectList = data;
    }

  ngOnInit() {
  }
}
