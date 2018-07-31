import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrComponent } from './group.component';

describe('GrComponent', () => {
  let component: GrComponent;
  let fixture: ComponentFixture<GrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
