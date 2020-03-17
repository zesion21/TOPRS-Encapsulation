import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGetTestComponent } from './data-get-test.component';

describe('DataGetTestComponent', () => {
  let component: DataGetTestComponent;
  let fixture: ComponentFixture<DataGetTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataGetTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataGetTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
