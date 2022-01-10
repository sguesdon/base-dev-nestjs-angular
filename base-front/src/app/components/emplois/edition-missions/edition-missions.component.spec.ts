import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionMissionsComponent } from './edition-missions.component';

describe('EditionMissionsComponent', () => {
  let component: EditionMissionsComponent;
  let fixture: ComponentFixture<EditionMissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionMissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
