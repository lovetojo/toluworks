import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwregComponent } from './veiwreg.component';

describe('VeiwregComponent', () => {
  let component: VeiwregComponent;
  let fixture: ComponentFixture<VeiwregComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiwregComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwregComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
