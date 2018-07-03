import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatTableModule } from '@angular/material';
import { MaterialImportsModule } from './material-imports.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialImportsModule
  ],
  declarations: [NavBarComponent],
  exports: [
    MaterialImportsModule,
    // my components
    NavBarComponent,
  ]
})
export class SharedModule { }
