/**
 * @module Navigation Bar
 */

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  /**
   * Creates new instance of the navigation bar
   * @param snackBar - Shows result to user
   * @param router - Routes user to appropriate page, depending on button clicked
   */
  constructor(
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * Navigates back to the main Movies page.
   */
  goHome(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user's profile view.
   */
  openProfile(): any {
    this.router.navigate(['profile']);
  }

  /**
   * Navigates back to the WelcomePageComponent and clears the user data and token from localStorage.
   */
  userLogout(): any {
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('User logged out!', 'OK', {
      duration: 1000,
    })
  }
}
