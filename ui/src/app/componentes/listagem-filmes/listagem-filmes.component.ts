import { Component, OnInit } from '@angular/core';
import { ListagemFilmesService } from './listagem-filmes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.css']
})
export class ListagemFilmesComponent implements OnInit {

  generos = [];
  movies = [];
  movieSearch;
  jsonGeneros = {}

  startPage = 1;
  endPage = 5;
  currentPage = 1;
  lastPage = 1;
  totalPages;
  pages = [];

  constructor(private listagemFilmesService: ListagemFilmesService, private router: Router) { }

  ngOnInit() {
    this.getGeneros();
  }

  setPage() {
    if(this.currentPage === 1 && this.lastPage === 1) {
      document.getElementById(`page${this.currentPage}`).className = 'active';
    } else {
      document.getElementById(`page${this.currentPage}`).className = 'active';
      document.getElementById(`page${this.lastPage}`).className = '';
      this.lastPage = this.currentPage;
    }
  }

  lessPages() {
    if(this.startPage === this.currentPage && this.currentPage !== 1) {
      this.startPage -= 1;
      this.currentPage -= 1;
      this.endPage -= 1;
    } else if(this.startPage !== this.currentPage && this.currentPage !== 1) {
      this.currentPage -= 1;
    }
    this.search(this.movieSearch);
  }

  morePages() {
    if(this.endPage === this.currentPage && this.currentPage !== this.totalPages) {
      this.endPage += 1;
      this.currentPage += 1;
      this.startPage += 1;
    } else if(this.endPage !== this.currentPage && this.currentPage !== this.totalPages) {
      this.currentPage += 1;
    }
    this.search(this.movieSearch);
  }

  onClickMovie(movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  checkGeneroTyped(name) {
    let i = 0;
    while(i < this.generos.length) {
      if(this.generos[i].name === name) {
        return [this.generos[i].id, true];
      }
      i += 1;
    }
    return [name, false];
  }

  onChangeInput(event) {
    let name = event.target.value;
    if(name === '') {
      this.movies = [];
    } else {
      this.movieSearch = this.checkGeneroTyped(name);
    }
  }

  search(name) {
    this.movieSearch = name;
    if(name === '') {
      this.movies = [];
    } else {
      let check = this.checkGeneroTyped(name);
      if(check[1] !== false) {
        this.listagemFilmesService.requestBuscaGeneros(check[0], this.currentPage, this.totalPages).subscribe(
          (data: any) => {
            if(data.status === '1') {
              this.movies = data.msg;
              this.totalPages = data.msg.total_pages;
              this.createPagination();
            }
          }
        )
      } else {
        this.listagemFilmesService.requestBuscaFilmes(check[0], this.currentPage, this.totalPages).subscribe(
          (data: any) => {
            if(data.status === '1') {
              this.movies = data.msg.items;
              this.totalPages = data.msg.total_pages;
              this.createPagination();
            }
          }
        )
      }
    }
  }

  getGeneros() {
    this.listagemFilmesService.requestGeneros().subscribe(
      (data: any) => {
        if(data.status === '1') {
          this.generos = data.msg;
          this.generos.forEach(gen => {
            this.jsonGeneros[gen.id] = gen.name;
          });
        }
      }
    );
  }

  createPagination() {
    for(let i = 1; i<=this.totalPages; i++) {
      this.pages.push(i);
    }
    this.setPage();
  }

  callPage(page = null) {
    this.currentPage = page;
    this.search(this.movieSearch);
  }

}
