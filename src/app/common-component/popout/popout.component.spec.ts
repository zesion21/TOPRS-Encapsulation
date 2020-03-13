import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoutComponent } from './popout.component';

describe('PopoutComponent', () => {
  let component: PopoutComponent;
  let fixture: ComponentFixture<PopoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
