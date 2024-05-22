import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const apiUrl = 'https://myflix-ghibli-7c8d5913b80b.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
  }

  private getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call to get all movies
  getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + '/movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call to get a single movie via movie id
  getSingleMovie(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/` + movie._id, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call for information on movie director
  getDirector(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/directors/` + movie.Director.Name + `/about`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call for information on movie genre
  getGenre(movie: any): Observable<any> {
    return this.http.get(apiUrl + `/movies/genres/` + movie.Genre.Name + `/about`, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call to get user info
  getUser(userDetails: any): Observable<any> {
    return this.http.get(apiUrl + `/profile/` + userDetails.Username, {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${this.getToken}`,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError));
  }

  // API call to update user info
  updateUser(userDetails: any): Observable<any> {
    return this.http.put(apiUrl + `/profile/` + userDetails.Username + `/account`, userDetails,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // API call to delete user
  deleteUser(userDetails: any): Observable<any> {
    return this.http.delete(apiUrl + `/profile/` + userDetails.Username + `/account`,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // API call to get users' favorite movies
  getFavMovies(userDetails: any): Observable<any> {
    return this.http.get(apiUrl + `/profile/` + userDetails.Username,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // API call to add movie to favorites
  addFavMovie(userDetails: any, movie: any): Observable<any> {
    return this.http.post(apiUrl + `/profile/` + userDetails.Username + `/movies/` + movie._id,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }

  // API call to delete movie from favorites
  deleteFavMovie(userDetails: any, movie: any): Observable<any> {
    return this.http.delete(apiUrl + `/profile/` + userDetails.Username + `/movies/` + movie._id,
      {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${this.getToken}`,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError));
  }
}