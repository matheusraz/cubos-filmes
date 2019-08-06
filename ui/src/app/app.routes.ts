import { Routes } from "@angular/router";
import { ListagemFilmesComponent } from "./componentes/listagem-filmes/listagem-filmes.component";

export const ROUTES: Routes = [
  // Main redirect
  {path: '', redirectTo: '/main', pathMatch: 'full'},

  // App views
  {path: 'main', component: ListagemFilmesComponent}
];
