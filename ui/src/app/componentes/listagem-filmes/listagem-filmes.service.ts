import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { createAuthorizationHeader } from '../../headers'

@Injectable({
  providedIn: 'root'
})

export class ListagemFilmesService {

  constructor(private http: HttpClient) { }

  requestBuscaFilmes(name, page, totalPages = '') {
    let keys = [];
    let values = [];
    if(totalPages === '' || totalPages === undefined) {
       keys = ['movie', 'page'];
       values = [name, page];
    } else {
      keys = ['movie', 'page', 'totalpages'];
      values = [name, page, totalPages];
    }
    return this.http.get(`${AppSettings.SERVER}/buscaFilme`, {
      headers: createAuthorizationHeader(keys, values)
    });
  }

  requestBuscaGeneros(generoId, page, totalPages = '') {
    return this.http.get(`${AppSettings.SERVER}/buscaGenero`, {
      headers: createAuthorizationHeader(['idgenero', 'page', 'totalpages'], [generoId, page, totalPages])
    });
  }

  requestGeneros() {
    return this.http.get(`${AppSettings.SERVER}/generos`, {
      headers: createAuthorizationHeader()
    });
  }

}
