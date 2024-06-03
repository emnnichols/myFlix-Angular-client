import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {

  user: any = {};
  username = JSON.parse(localStorage['user']).Username;
  birthday = JSON.parse(localStorage['user']).Birthday;
  movies: any[] = [];
  favoriteMovies: any[] = [];
  isFav: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getProfile();
    this.getFavoriteMovies();
    // Renders accurate birthday when using Date pipe
    this.birthday = new Date(this.birthday);
    this.birthday.setDate(this.birthday.getDate() + 1);
  }

  // returns current user information
  getProfile(): void {
    this.fetchApiData.getUser(this.username).subscribe((resp: any) => {
      this.user = resp;
      this.favoriteMovies = this.user.FavoriteMovies;
      return this.user, this.favoriteMovies;
    })
  }

  // Opens dialog box to update user info
  openUpdateDialog(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '380px'
    });
  }

  // Button to navigate back to movies pages
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  // Fetches users favorite movies
  getFavoriteMovies(): any {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp.filter((movie: any) => this.favoriteMovies.includes(movie._id));
      return this.movies;
    })
  }

  // Check needed for favorite icon
  isFavorite(movie: any): any {
    if (this.favoriteMovies.includes(movie)) {
      return this.isFav = true;
    } else {
      return this.isFav = false;
    };
  }

  // Allows user to remove movie from favorites from profile
  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavorite(movie._id)
      : this.getProfile();
  }

  // Logic for removing favorite from user data
  removeFavorite(movie: string): void {
    this.fetchApiData.deleteFavMovie(this.user.Username, movie).subscribe((response) => {
      this.getProfile();
      localStorage.setItem('user', JSON.stringify(response));
      this.getFavoriteMovies();
      this.snackBar.open('Removed from favorites!', 'OK', {
        duration: 1000,
      });
    });
  }
}