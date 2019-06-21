import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    responsiveMenuActive:boolean = false;
    searchActive:boolean = false;

  constructor() { }

  ngOnInit() {
  }
  
  toggleMenu(event) {
      this.responsiveMenuActive = !this.responsiveMenuActive; 
  }
  
  closeMenu(event) {
      this.responsiveMenuActive = false; 
  }
  
  toggleSearch(event) {
      this.searchActive = !this.searchActive;
  }
}
