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
  user = JSON.parse(localStorage['user']);

  @Input() userInput = { Username: '', Email: '', Password: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

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

  openDeleteDialog(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '450px'
    });
  }
}
