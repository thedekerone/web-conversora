import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  showHeader = true;
  info = [];

  constructor(public authSer: AuthService,private router: Router){
    
    //this.info = JSON.parse(localStorage.getItem("zxc21dsrty5uyj11j1"));
    //console.log(this.info);

  }

  ngOnInit() {
  }
 
 
  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
