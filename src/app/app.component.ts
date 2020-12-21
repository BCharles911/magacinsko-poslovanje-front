import { TokenStorageService } from './_services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private tokenStorageService : TokenStorageService) {}

  isLoggedIn = false;
  showAdminBoard = false;
  isSidebarOpen = false;

   ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if(this.isLoggedIn){

    }

   }
  title = 'magacinsko-poslovanje-front';

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
    this.isLoggedIn = false;
  }

   openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.isSidebarOpen = true;
  }

   closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    this.isSidebarOpen = false;
  }

}
