import { TestBed, inject } from '@angular/core/testing';

import { ListagemFilmesService } from './listagem-filmes.service';

describe('ListagemFilmesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListagemFilmesService]
    });
  });

  it('should be created', inject([ListagemFilmesService], (service: ListagemFilmesService) => {
    expect(service).toBeTruthy();
  }));
});
