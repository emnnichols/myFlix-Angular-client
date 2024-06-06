import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { AppComponent } from '../app.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  favoriteMovies: any[] = [];
  isFav: boolean = false;
  style: any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public breakpoints: AppComponent,
    private responsive: BreakpointObserver,
    private router: Router) {
    this.responsive.observe(
      [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape])
      .subscribe((result: BreakpointState) => this.setStyle())
  }

  ngOnInit(): void {
    this.setStyle();
    this.getMovies();
    this.getFavoriteMovies();
  }

  // Gets the current breakpoint style from AppComponent
  setStyle(): any {
    console.log(this.breakpoints.breakpointStyle)
    this.style = this.breakpoints.breakpointStyle;
  }

  // Get movies from API
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // Open movie information dialog boxes + pass on data
  openGenreInfo(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '650px',
    });
  }

  openDirectorInfo(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '650px',
    });
  }

  openMovieInfo(info: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        movie: info
      },
      width: '650px',
    })
  }

  // Gets current users favorite movies
  getFavoriteMovies(): void {
    let username = JSON.parse(localStorage['user']).Username;
    this.fetchApiData.getFavMovies(username).subscribe((resp: any) => {
      this.user = resp;
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user, this.favoriteMovies;
    })
  }

  // Checks movies for favorites
  isFavorite(movie: any): any {
    if (this.favoriteMovies.includes(movie)) {
      return this.isFav = true;
    } else {
      return this.isFav = false;
    };
  }

  // Calls either addFavorite or removeFavorites depending on isFavorite
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavorite(movie._id)
      : this.addFavorite(movie._id)
  }

  addFavorite(movie: any): void {
    this.fetchApiData.addFavMovie(this.user.Username, movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavoriteMovies();
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 3000,
      });
    })
  }

  removeFavorite(movie: string): void {
    this.fetchApiData.deleteFavMovie(this.user.Username, movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavoriteMovies();
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 3000,
      });
    })
  }
}
