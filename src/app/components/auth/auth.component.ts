import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  email = "codedemo809@gmail.com";
  paswword = "44167";

  constructor(private router: Router, private authServe:AuthService) { }

  ngOnInit() {
    localStorage.clear();
  }

  procesarLogin(){


    if(this.email == ""){
      $("#msjResponseValid").html('<div class="alert alert-danger">Ingrese un correo electrónico</div>');
      return false;
    }

    if(this.paswword == ""){
      $("#msjResponseValid").html('<div class="alert alert-danger">Ingrese una contraseña</div>');
      return false;
    }

    $("#txtEmailData").attr("disabled", "true");
    $("#txtpasswordData").attr("disabled", "true");
    $("#btnLoadingData").attr("disabled", "true");
    $("#btnLoadingData").text("Validando accesos");

    this.authServe.consultarLogin(this.email, this.paswword).subscribe(response => {
      console.log(response);
      if(response["success"]){
        console.log(response);
        $("#msjResponseValid").html('<div class="alert alert-success">'+response["message"]+'</div>');

        var infSuccess = {
          "e33645rr4f" : 'true',
          "id_usuario" : response["data"][0]["id_usuario"].toString(),
          "id_canal" : response["data"][0]["id_canal"].toString(),
          "canal" : response["data"][0]["canal"].toString(),
          "id_empresa" : response["data"][0]["id_empresa"].toString(),
          "empresa" : response["data"][0]["empresa"].toString(),
          "id_rol" : response["data"][0]["id_rol"].toString(),
          "rol" : response["data"][0]["rol"].toString(),
          "nombre" : response["data"][0]["nombre"].toString(),
          "apellido_paterno" : response["data"][0]["apellido_paterno"].toString(),
          "apellido_materno" : response["data"][0]["apellido_materno"].toString(),
          "fecha_nacimiento" : response["data"][0]["fecha_nacimiento"].toString(),
          "tipo_documento" : response["data"][0]["tipo_documento"].toString(),
          "documento" : response["data"][0]["documento"].toString(),
          "correo" : response["data"][0]["correo"].toString(),
          "tipo" : response["data"][0]["tipo"].toString(),
          "permisos" : response["data"][0]["permisos"],
        };


        localStorage.setItem('zxc21dsrty5uyj11j1',JSON.stringify(infSuccess));
        this.router.navigate(['/trama']);
        return false;
      }else{

        $("#txtEmailData").removeAttr("disabled");
        $("#txtpasswordData").removeAttr("disabled");
        $("#btnLoadingData").removeAttr("disabled");
        $("#btnLoadingData").text("Acceder");
        $("#msjResponseValid").html('<div class="alert alert-danger">'+response["message"]+'</div>');
        return false;
      }
    });
  }

}
