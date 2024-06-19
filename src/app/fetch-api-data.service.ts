/**
 * @module Fetch API Data
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Base API url
 */
const apiUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * @category Constructors
   * @param http
   */
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } if (error.status != 200) {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    } else {
      console.log(error.error)
    }
  }

  /**
   * Extract token from localStorage.
   * @returns Token for HttpHeader authorization.
   */
  private getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  /**
   * Extract data from HTTP responses.
   * @param res - HTTP response object
   * @returns Extracted data or empty object.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Registers new user.
   * @category User API Calls
   * @param userDetails - Details of the user to be created (Username, Password, Email, Birthday)
   * @returns An observable with registration status.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails.Username + ' created an account!');
    return this.http.post(apiUrl + '/signup', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in existing user.
   * @category User API Calls
   * @param userDetails - User credentials (Username, Password)
   * @returns An observable with login attempt status.
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails.Username + ' signed in!')
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve all movies from database.
   * @category Movie API Calls
   * @returns An observable with all movies.
   */
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve data on a specific movie.
   * @category Movie API Calls
   * @param movie - The movie details to retrieve the movie ID
   * @returns An observable with details about the movie.
   */
  getSingleMovie(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/` + movie._id, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Retrieve data on the movies director.
   * @category Movie API Calls
   * @param movie - The movie details to retrieve director name
   * @returns An observable with the director details (Name, Bio, Birth/Death).
   */
  getDirector(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/directors/` + movie.Director.Name + `/about`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Retrieve data on the movies genre.
   * @category Movie API Calls
   * @param movie - The movie details to retrieve genre name
   * @returns An observable with the genre details (Name, Description).
   */
  getGenre(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/genres/` + movie.Genre.Name + `/about`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Retrieve user details.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @returns An observable with the user details.
   */
  getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + '/profile/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken()}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  /**
   * Update user details.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @param userDetails - Object with updated user details
   * @returns An observable with the updated user details.
   */
  updateUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(apiUrl + '/profile/' + username + `/account`, userDetails,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Deletes a user.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @returns An observable with the user deletion status
   */
  deleteUser(username: any): Observable<any> {
    return this.http.delete(apiUrl + `/profile/` + username + `/account`,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Retrieve favorite movies the user.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @returns An observable with the users favorite movies.
   */
  getFavMovies(username: any): Observable<any> {
    return this.http.get(apiUrl + '/profile/' + username,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Adds movie to users favorite movies.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @param movieID - The ID of the movie
   * @returns An observable with the users favorite movies.
   */
  addFavMovie(username: any, movieID: any): Observable<any> {
    return this.http.post(apiUrl + '/profile/' + username + '/movies/' + movieID, null,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  /**
   * Deletes movie from users favorite movies.
   * @category User API Calls
   * @param username - Username of the logged in user
   * @param movieID - The ID of the movie
   * @returns An observable with the users favorite movies.
   */
  deleteFavMovie(username: any, movieID: any): Observable<any> {
    return this.http.delete(apiUrl + '/profile/' + username + '/movies/' + movieID,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken()}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }
}