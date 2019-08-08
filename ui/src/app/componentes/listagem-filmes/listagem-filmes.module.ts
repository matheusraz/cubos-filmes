import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemFilmesComponent } from './listagem-filmes.component';
import { ListagemFilmesService } from './listagem-filmes.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ListagemFilmesService
  ],
  declarations: [ListagemFilmesComponent]
})
export class ListagemFilmesModule { }
