import { TestBed, inject } from '@angular/core/testing';

import { FilmeService } from './filme.service';

describe('FilmeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilmeService]
    });
  });

  it('should be created', inject([FilmeService], (service: FilmeService) => {
    expect(service).toBeTruthy();
  }));
});
