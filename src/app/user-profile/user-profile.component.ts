/**
 * @module User Profile
 */

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { AppComponent } from '../app.component';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {

  user: any = {};
  username = localStorage ? JSON.parse(localStorage['user']).Username : null;
  birthday = localStorage ? JSON.parse(localStorage['user']).Birthday : null;
  movies: any[] = [];
  favoriteMovies: any[] = [];
  isFav: boolean = false;
  style: any = '';

  /**
   * Creates an instance of the users profile; 
   * shows some user details, edit button, and favorite movies
   * @param fetchApiData - Use API data service
   * @param snackBar - Shows result to user
   * @param dialog - Open Update User dialog
   * @param breakpoints - Use established breakpoints
   * @param responsive - Makes page responsive
   * @param router - Routes user back to /movies
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public breakpoints: AppComponent,
    private responsive: BreakpointObserver,
    private router: Router) {
    // Track screen size changes
    this.responsive.observe(
      [Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape])
      .subscribe((result: BreakpointState) => this.setStyle())
  }

  /**
   * Initialize user details and favorite movies
   * @group Initialized on Loading
   */
  ngOnInit(): void {
    this.setStyle();
    this.getProfile();
    this.getFavoriteMovies();
    // Renders accurate birthday when using Date pipe
    this.birthday = new Date(this.birthday);
    this.birthday.setDate(this.birthday.getDate() + 1);
  }

  /**
   * Sets style based on the current breakpoint from {@link AppComponent}
   * @group Initialized on Loading
   */
  setStyle(): any {
    console.log(this.breakpoints.breakpointStyle)
    this.style = this.breakpoints.breakpointStyle;
  }

  /**
   * Returns current user information
   * @group Initialized on Loading
   */
  getProfile(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.user = resp;
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user, this.favoriteMovies;
    })
  }

  /**
   * Opens dialog box where users can update their details
   */
  openUpdateDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '380px'
    });
  }

  /**
   * @ignore
   * Navigates user back to Movies when Back button is clicked
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Fetches users favorite movies
   * @group Initialized on Loading
   */
  getFavoriteMovies(): any {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((movie: any) => this.favoriteMovies.includes(movie._id));
      return this.movies;
    })
  }

  // Check needed for favorite icon
  /**
   * Compares movie to users favorites to determine which 
   * Angular Material icon to use to reflect favorite status.
   * @group Initialized on Loading
   * @param movie 
   * @returns Boolean value of whether the given movie is found in the user's favorite movies array
   */
  isFavorite(movie: any): any {
    if (this.favoriteMovies.includes(movie)) {
      return this.isFav = true;
    } else {
      return this.isFav = false;
    };
  }

  /**
   * Allows user to remove movie from their favorites from the profile view
   * @param movie - Used to get movie ID to pass to {@link isFavorite}
   */
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavorite(movie._id)
      : this.getProfile();
  }

  // Logic for removing favorite from user data
  /**
   * Removes movie from favorite movies array and 
   * resets stored user to reflect change and update profile view
   * @param movie 
   */
  removeFavorite(movie: string): void {
    this.fetchApiData.deleteFavMovie(this.user.Username, movie).subscribe((response) => {
      this.getProfile();
      localStorage ? localStorage.setItem('user', JSON.stringify(response)) : null;
      this.getFavoriteMovies();
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 1000,
      });
    });
  }
}