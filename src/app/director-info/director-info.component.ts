import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrl: './director-info.component.scss'
})
export class DirectorInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)

    // Director data injected from Movie Card component
    public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string
    }) { }

  ngOnInit(): void {

  }

}
