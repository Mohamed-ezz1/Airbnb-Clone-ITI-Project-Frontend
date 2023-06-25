import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GttComponent } from './gtt.component';

describe('GttComponent', () => {
  let component: GttComponent;
  let fixture: ComponentFixture<GttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
