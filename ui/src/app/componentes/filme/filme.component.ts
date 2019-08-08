import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from './filme.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

  movie;

  constructor(private route: ActivatedRoute, private filmeService: FilmeService) { }

  ngOnInit() {
    let movieId = this.route.snapshot.params['id'];
    this.filmeService.requestFilme(movieId).subscribe(
      (data: any) => {
        if(data.status === '1') {
          this.movie = data.msg
          console.log(this.movie);
        }
      }
    )
  }

}
