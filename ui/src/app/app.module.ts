import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { ListagemFilmesModule } from './componentes/listagem-filmes/listagem-filmes.module';
import { HttpClientModule } from '@angular/common/http';
import { FilmeModule } from './componentes/filme/filme.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    ListagemFilmesModule,
    FilmeModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})

export class AppModule { }
