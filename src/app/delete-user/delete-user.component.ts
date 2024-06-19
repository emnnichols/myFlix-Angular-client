/**
 * @module User Delete
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})

export class DeleteUserComponent implements OnInit {
  /**
   * Extracts user data from localStorage
   */
  user = localStorage ? JSON.parse(localStorage['user']) : null;

  // Input from delete user form
  /**
   * Object that holds user input data 
   * needed before they can click the delete button
   */
  @Input() userInput = { Username: '', Password: '' };

  /**
   * Creates new instance of the DeleteUserComponent dialog box
   * @param fetchApiData - Use API data service
   * @param dialogRef - Closes dialog on successful data update
   * @param snackBar - Shows result to user
   * @param router - Routes user to WelcomePageComponent on success
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // Delete user API call
  // Username inputed must match username stored in localStorage
  /**
   * Checks input submitted by user to ensure username matches logged in user.
   * If they match, delete request is sent to backend.
   * 
   * On success, user is notified their account was deleted and is navigated back to the {@link WelcomePageComponent | Welcome Page}.
   * 
   * On failure, user is notified the usernames did not match.
   */
  deleteUser(): void {
    if (this.userInput.Username === this.user.Username) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
        if (result.includes('was deleted')) {
          this.dialogRef.close(); // close modal on success
          this.snackBar.open('account deleted!', 'OK', {
            duration: 2000
          });
          // Reroutes user to Welome component upon account deletion
          this.router.navigate(['welcome']);
          localStorage ? localStorage.clear() : null;
        }
      }, (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      });
    } else {
      this.snackBar.open('Wrong username, whoops! (Permission denied) ', 'OK', {
        duration: 2000
      });
    };
  }
}
