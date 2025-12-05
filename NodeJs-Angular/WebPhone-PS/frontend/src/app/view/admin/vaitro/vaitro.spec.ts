import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaiTro } from './vaitro';

describe('Vaitro', () => {
  let component: VaiTro;
  let fixture: ComponentFixture<VaiTro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaiTro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaiTro);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
