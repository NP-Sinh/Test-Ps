import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Picture } from './picture';

describe('Picture', () => {
  let component: Picture;
  let fixture: ComponentFixture<Picture>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Picture]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Picture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
