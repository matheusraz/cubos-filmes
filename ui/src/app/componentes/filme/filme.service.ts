import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { createAuthorizationHeader } from '../../headers'

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  requestFilme(movieId) {
    return this.http.get(`${AppSettings.SERVER}/filme/${movieId}`, {
      headers: createAuthorizationHeader()
    });
  }

}
