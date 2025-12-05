import { TestBed } from '@angular/core/testing';

import { VaitroService } from './vaitro.service';

describe('VaitroService', () => {
  let service: VaitroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VaitroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
