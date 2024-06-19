/**
 * @module User Login
 */

import { Component, OnInit, Input } from '@angular/core';
// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// Display notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object holding the users credentials
   */
  @Input() userData = { Username: '', Password: '' };

  /**
   * Creates an instance of UserLoginComponent
   * @param fetchApiData - Use API data service
   * @param dialogRef - Close dialog reference on success
   * @param snackBar - Shows result to user
   * @param router - Routes user to /movies on success
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Logs user in by sending input values to myFlix API.
   * On success, dialog is closed, user and token are stored in localStorage, then navigates to Movies page.
   * On failure, snackBar shows error message.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); // close modal on success
      this.snackBar.open('successfully logged in!', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
