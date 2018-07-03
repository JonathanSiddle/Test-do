import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule
  ],
  declarations: [NavBarComponent],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    // my components
    NavBarComponent,
    MatTableModule
  ]
})
export class SharedModule { }
