import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingQueryComponent } from './paging-query.component';

describe('PagingQueryComponent', () => {
  let component: PagingQueryComponent;
  let fixture: ComponentFixture<PagingQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
