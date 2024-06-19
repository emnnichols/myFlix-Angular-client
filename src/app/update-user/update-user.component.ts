/**
 * @module User Update
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  /**
   * Extract logged in user from localStorage
   */
  user = JSON.parse(localStorage['user']);

  /**
   * Object that holds the updated data input by user
   */
  @Input() userInput = { Username: '', Email: '', Password: '', Birthday: '' };

  /**
   * Creates new instance of the UpdateUserComponent dialog
   * @param fetchApiData - Use API data service
   * @param dialog - Open Delete User dialog
   * @param dialogRef - Closes dialog on successful data update
   * @param snackBar - Shows result to user
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * Dialog box that holds the form that allows the user to update their information.
   * 
   * Checks for what fields have been filled and sends object of user data to backend.
   * @remarks If username and/or email and/or birthday fields are left empty, they are auto-filled with stored user info.
   * 
   * For example, If 
   * ```
   * { Username: '', 
   * Email: 'updated@email.com', 
   * Password: 'password', 
   * Birthday: '' }
   * ```
   * is provided, then 
   * 
   * ```
   * { Username: 'user.Username', 
   * Email: 'updated@email.com', 
   * Password: 'password', 
   * Birthday: 'user.Birthday' }
   * ```
   * is sent to the backend
   */
  updateUser(): void {
    let userData = {
      Username: this.userInput.Username === '' ? this.user.Username : this.userInput.Username,
      Email: this.userInput.Email === '' ? this.user.Email : this.userInput.Username,
      Password: this.userInput.Password === '' ? null : this.userInput.Password,
      Birthday: this.userInput.Birthday === '' ? this.user.Birthday : this.userInput.Birthday
    };
    this.fetchApiData.updateUser(this.user.Username, userData).subscribe((result) => {
      console.log(result);
      this.dialogRef.close(); // close modal on success
      this.snackBar.open('successfully updated!', 'OK', {
        duration: 2000
      });
      localStorage.setItem('user', JSON.stringify(result));
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Closes update dialog box and opens {@link DeleteUserComponent | user deletion} dialog box
   */
  openDeleteDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '450px'
    });
    this.dialogRef.close(); // closes update dialog box
  }
}
