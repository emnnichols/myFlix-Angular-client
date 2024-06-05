import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'ghibliFlix';
  breakpointStyle: any;

  constructor(
    public responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape]).subscribe(result => {
      const breakpoints = result.breakpoints;

      if (breakpoints[Breakpoints.HandsetPortrait]) {
        let breakpointCard = { 'display': 'block', 'width': '100%', 'margin-left': '-10px', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'block', 'width': '100%', 'margin-left': '-10px', 'margin-top': '160px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-80px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'display': 'none' }

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
      else if (breakpoints[Breakpoints.HandsetLandscape]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '90%', 'margin-left': '-20px', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '90%', 'margin-left': '-20px', 'margin-top': '160px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-80px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'display': 'none' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
      else if (breakpoints[Breakpoints.TabletPortrait]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr', 'width': '98%', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr', 'width': '98%', 'margin-top': '180px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-100px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'position': 'absolute', 'margin-top': '-45px', 'width': '100%' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
      else if (breakpoints[Breakpoints.TabletLandscape]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '98%', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '98%', 'margin-top': '190px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '-5px', 'padding-top': '5px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-100px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'position': 'absolute', 'margin-top': '-45px', 'width': '100%' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
      else {
        let breakpointCard = { 'display': 'flex', 'width': '100%', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'flex', 'width': '100%', 'margin-top': '190px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '-5px', 'padding-top': '5px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-100px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'position': 'absolute', 'margin-top': '-45px', 'width': '100%' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
    });
  }
}
