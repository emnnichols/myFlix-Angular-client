/**
 * @module Movie Card
 */

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
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

  /**
   * Initializes new instance of the MoveCardComponent
   * @param fetchApiData - Use API data service
   * @param snackBar - Shows result to user
   * @param dialog - Open corresponding dialog boxes
   * @param breakpoints - Use established breakpoints
   * @param responsive - Makes page responsive
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public breakpoints: AppComponent,
    private responsive: BreakpointObserver) {
    this.responsive.observe(
      [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape])
      .subscribe((result: BreakpointState) => this.setStyle())
  }

  /**
   * On initializion, the style is set by ```breakpointStyle``` passed from {@link AppComponent}, 
   * movies are fetched from the API, 
   * and the user's favorite movies are fetched.
   */
  ngOnInit(): void {
    this.setStyle();
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Style is determined by the current ```breakpointStyle``` from {@link AppComponent}
   */
  setStyle(): any {
    console.log(this.breakpoints.breakpointStyle)
    this.style = this.breakpoints.breakpointStyle;
  }

  /**
   * Fetches movies from the myFlix API
   * @see [API documentation](https://myflix-ghibli-7c8d5913b80b.herokuapp.com/documentation)
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens {@link GenreInfoComponent | GenreInfo} dialog box and passes on genre data.
   * @group Methods for  Movie Details
   * @param name - Genre name
   * @param description - Genre description
   */
  openGenreInfo(name: string, description: string): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '650px',
    });
  }

  /**
   * Opens {@link DirectorInfoComponent | DirectorInfo} dialog box and passes on director data.
   * @group Methods for  Movie Details
   * @param name - Director name
   * @param bio - Director biography
   * @param birth - Directors birth date
   * @param death - Directors death date (if applicable)
   */
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

  /**
   * Opens {@link MovieInfoComponent | MovieInfo} dialog box and passes on movie data.
   * @group Methods for  Movie Details
   * @param info - All movie information
   */
  openMovieInfo(info: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        movie: info
      },
      width: '650px',
    })
  }

  /**
   * Gets current users favorite movies
   * @group Methods for Favorite Movies
   */
  getFavoriteMovies(): void {
    let username = JSON.parse(localStorage['user']).Username;
    this.fetchApiData.getFavMovies(username).subscribe((resp: any) => {
      this.user = resp;
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user, this.favoriteMovies;
    })
  }

  /**
   * Checks movies fetched from API to find the users favorite movies.
   * @group Methods for Favorite Movies
   * @param movie - Movie being checked against favoriteMovies
   * @returns Boolean value depending on if the ```movie``` is found in favoriteMovies.
   */
  isFavorite(movie: any): any {
    if (this.favoriteMovies.includes(movie)) {
      return this.isFav = true;
    } else {
      return this.isFav = false;
    };
  }

  // Calls either addFavorite or removeFavorites depending on isFavorite
  /**
   * Called when the Angular Material icon / favorite button 
   * on a movie card is clicked.
   * 
   * If the movie is favorited, {@link addFavorite} is called, 
   * if the movie is not favorited, {@link removeFavorite} is called.
   * 
   * @group Methods for Favorite Movies
   * @param movie - Movie being checked against favoriteMovies array.
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavorite(movie._id)
      : this.addFavorite(movie._id)
  }

  /**
   * If movie is not favorited and {@link toggleFavorite} is called,
   * this sends the request to the backend to add movie to favorite movies array.
   * 
   * On success, the updated user data is set in localStorage
   *  and {@link getFavoriteMovies} is called again.
   * 
   * @group Methods for Favorite Movies
   * @param movie - Movie for the backend to find and add to list.
   */
  addFavorite(movie: any): void {
    this.fetchApiData.addFavMovie(this.user.Username, movie).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavoriteMovies();
      this.snackBar.open('Added to favorites!', 'OK', {
        duration: 3000,
      });
    })
  }

  /**
   * If movie is favorited and {@link toggleFavorite} is called,
   * this sends the request to the backend to remove movie from favorite movies array.
   * 
   * On success, the updated user data is set in localStorage
   *  and {@link getFavoriteMovies} is called again.
   * 
   * @group Methods for Favorite Movies
   * @param movie - Movie for the backend to find and remove from list.
   */
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
