import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintregComponent } from './printreg.component';

describe('PrintregComponent', () => {
  let component: PrintregComponent;
  let fixture: ComponentFixture<PrintregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
