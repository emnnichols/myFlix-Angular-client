/**
 * @module App Component
 */

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'myFlix-client-Angular';
  breakpointStyle: any;

  /**
   * Initiates BreakpointObserver when app loads
   * @param responsive - Observe breakpoint changes
   */
  constructor(
    public responsive: BreakpointObserver) { }

  /**
   * If a breakpoint change is observed, 
   * it sets the ```breakpoint``` constant. 
   * This constant is then used to decide which style object 
   * ```breakpointStyle``` passes onto responsive components.
   * 
   * If no breakpoints are matched, the default styling is passed to ```breakpointStyle```.
   * 
   * @remarks Observes changes that match breakpoints of the following sizes:
   * 
   * * HandsetPortrait
   * 
   * * HandsetLandscape
   * 
   * * TabletPortrait
   *
   * * TabletLandscape
   *
   */
  ngOnInit(): void {
    // OBSERVE BREAKPOINT STATUS
    this.responsive.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape]).subscribe(result => {
      const breakpoints = result.breakpoints;

      // Styles for small portrait screen sizes
      if (breakpoints[Breakpoints.HandsetPortrait]) {
        let breakpointCard = { 'display': 'block', 'width': '100%', 'margin-left': '-10px', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'block', 'width': '100%', 'margin-left': '-10px', 'margin-top': '160px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-80px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'display': 'none' }

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }
      // Styles for small landscape screen sizes
      else if (breakpoints[Breakpoints.HandsetLandscape]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '90%', 'margin-left': '-20px', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '90%', 'margin-left': '-20px', 'margin-top': '160px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-80px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'display': 'none' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }

      // Styles for medium portrait screen sizes
      else if (breakpoints[Breakpoints.TabletPortrait]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr', 'width': '98%', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr', 'width': '98%', 'margin-top': '180px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '0px', 'padding-top': '10px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-100px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'position': 'absolute', 'margin-top': '-45px', 'width': '100%' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }

      // Styles for medium landscape screen sizes
      else if (breakpoints[Breakpoints.TabletLandscape]) {
        let breakpointCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '98%', 'margin-top': '100px' };
        let breakpointProfileCard = { 'display': 'grid', 'grid-template-columns': '1fr 1fr 1fr', 'width': '98%', 'margin-top': '190px' };
        let breakpointHeader = { 'display': 'block', 'margin-top': '-5px', 'padding-top': '5px', 'width': '100%', 'background-color': 'ghostwhite' };
        let breakpointUsername = { 'position': 'absolute', 'margin-top': '-100px', 'margin-left': '30px', 'width': '100%' };
        let breakpointUserInfo = { 'position': 'absolute', 'margin-top': '-45px', 'width': '100%' };

        return this.breakpointStyle = { card: breakpointCard, profile: breakpointProfileCard, header: breakpointHeader, info: breakpointUserInfo, user: breakpointUsername }
      }

      // Default styling
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
