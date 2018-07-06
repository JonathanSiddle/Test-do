import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MaterialImportsModule } from './material-imports.module';
import { NewProjectDialogComponent } from './dialogs/new-project-dialog/new-project-dialog.component';
import { FormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule,
    FormsModule
  ],
  declarations: [NavBarComponent, NewProjectDialogComponent],
  exports: [
    MaterialImportsModule,
    // my components
    NavBarComponent,
  ]
})
export class SharedModule { }
