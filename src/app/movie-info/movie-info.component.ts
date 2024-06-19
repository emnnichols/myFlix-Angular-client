/**
 * @module Movie Info
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})
export class MovieInfoComponent implements OnInit {
  /**
   * Creates new instance of the MovieInfoComponent
   * @param data - Movie data injected from Movie Card component
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)

    public data: {
      movie: any
    }) { }

  ngOnInit(): void {

  }
}
