import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  ghibliHeader: any = "https://i.ibb.co/sP3v45k/pngegg.png";

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // Function to open dialog when sign up button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '380px'
    });
  }

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '380px'
    });
  }
}