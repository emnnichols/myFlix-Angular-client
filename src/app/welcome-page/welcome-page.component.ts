/**
 * @module Welcome Page
 */

/**
 * The Welcome Page Component is the landing page for the application.
 * It provides the dialogs that allows the user to login or register.
 */

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

  /**
   * Creates instance of the WelcomePageComponent/
   * @param dialog - Uses MatDialog to handle the dialogs opening
   */
  constructor(public dialog: MatDialog) { }

  /**
   * Initializes component.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog when 'signup' button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '380px'
    });
  }

  /**
   * Opens the user login dialog when 'login' button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '380px'
    });
  }
}