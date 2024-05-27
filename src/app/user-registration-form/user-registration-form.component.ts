import { Component, OnInit, Input } from '@angular/core';
// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// Import the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// Display notifications to user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss'
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // Responsible for sending form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      this.dialogRef.close(); // close modal on success
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
