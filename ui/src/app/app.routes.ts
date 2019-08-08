import { Routes } from "@angular/router";
import { ListagemFilmesComponent } from "./componentes/listagem-filmes/listagem-filmes.component";
import { FilmeComponent } from "./componentes/filme/filme.component";

export const ROUTES: Routes = [
  // Main redirect
  {path: '', redirectTo: '/main', pathMatch: 'full'},

  // App views
  { path: 'main', component: ListagemFilmesComponent },
  { path: 'movie/:id', component: FilmeComponent }
  
];
