import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectDialogComponent } from './new-project-dialog.component';
import { FormsModule } from '@angular/forms';
import { MaterialImportsModule } from '../../material-imports.module';

describe('NewProjectDialogComponent', () => {
  let component: NewProjectDialogComponent;
  let fixture: ComponentFixture<NewProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MaterialImportsModule ],
      declarations: [ NewProjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
