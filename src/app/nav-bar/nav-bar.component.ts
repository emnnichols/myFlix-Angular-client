import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
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

  goHome(): void {
    this.router.navigate(['movies']);
  }

  openProfile(): any {
    this.router.navigate(['profile']);
  }

  userLogout(): any {
    this.router.navigate(['welcome']);
    localStorage.clear();
    this.snackBar.open('User logged out!', 'OK', {
      duration: 1000,
    })
  }
}
