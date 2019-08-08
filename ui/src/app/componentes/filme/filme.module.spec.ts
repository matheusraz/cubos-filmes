import { FilmeModule } from './filme.module';

describe('FilmeModule', () => {
  let filmeModule: FilmeModule;

  beforeEach(() => {
    filmeModule = new FilmeModule();
  });

  it('should create an instance', () => {
    expect(filmeModule).toBeTruthy();
  });
});
