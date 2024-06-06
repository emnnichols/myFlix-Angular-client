import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)


    // Synopsis data injected from Movie Card component
    public data: {
      movie: any
    }) { }

  ngOnInit(): void {

  }
}
