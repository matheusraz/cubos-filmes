import { ListagemFilmesModule } from './listagem-filmes.module';

describe('ListagemFilmesModule', () => {
  let listagemFilmesModule: ListagemFilmesModule;

  beforeEach(() => {
    listagemFilmesModule = new ListagemFilmesModule();
  });

  it('should create an instance', () => {
    expect(listagemFilmesModule).toBeTruthy();
  });
});
