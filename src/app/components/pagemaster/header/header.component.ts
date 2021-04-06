import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(public authSer: AuthService,private router: Router){}

  ngOnInit() {
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
