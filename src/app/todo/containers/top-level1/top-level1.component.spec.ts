import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevel1Component } from './top-level1.component';

describe('TopLevel1Component', () => {
  let component: TopLevel1Component;
  let fixture: ComponentFixture<TopLevel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLevel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
