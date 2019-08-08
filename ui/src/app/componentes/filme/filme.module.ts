import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmeComponent } from './filme.component';
import { FilmeService } from './filme.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FilmeService
  ],
  declarations: [FilmeComponent],
  exports: [
    FilmeComponent
  ]
})
export class FilmeModule { }
