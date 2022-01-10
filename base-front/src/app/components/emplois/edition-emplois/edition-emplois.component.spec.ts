import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionEmploisComponent } from './edition-emplois.component';

describe('EditionEmploisComponent', () => {
  let component: EditionEmploisComponent;
  let fixture: ComponentFixture<EditionEmploisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionEmploisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionEmploisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
