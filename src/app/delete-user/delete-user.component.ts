import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})
export class DeleteUserComponent implements OnInit {
  user = JSON.parse(localStorage['user']);

  @Input() userInput = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteUser(): void {
    if (this.userInput.Username === this.user.Username) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe((result) => {
        if (result.includes('was deleted')) {
          this.dialogRef.close(); // close modal on success
          this.snackBar.open('account deleted!', 'OK', {
            duration: 2000
          });
          this.router.navigate(['welcome']);
          localStorage.clear();
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
