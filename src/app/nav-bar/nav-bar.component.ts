import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {

  }

  // Routes user back to the main Movies page
  goHome(): void {
    this.router.navigate(['movies']);
  }

  // Routes user to their profile
  openProfile(): any {
    this.router.navigate(['profile']);
  }

  // Clears localStorage and routes user back to Welcome component
  userLogout(): any {
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('User logged out!', 'OK', {
      duration: 1000,
    })
  }
}
