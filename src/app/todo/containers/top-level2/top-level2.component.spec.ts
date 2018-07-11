import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevel2Component } from './top-level2.component';

describe('TopLevel2Component', () => {
  let component: TopLevel2Component;
  let fixture: ComponentFixture<TopLevel2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLevel2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
