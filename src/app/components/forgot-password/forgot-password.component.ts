import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecoverService } from 'src/app/services/recover.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


  recoverPasswordForm: FormGroup;
  email = "";

  constructor(private recServ: RecoverService, private router: Router, private authServe:AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    localStorage.clear();


    this.recoverPasswordForm = this.formBuilder.group({
      action: "recuperar",
      correo: ['', [Validators.required]],
    });
  }

  btnRecuperar(){
    this.recServ.recuperarClave(this.recoverPasswordForm.value).subscribe(response => {

      if(response['success'] == true){
        Swal.fire({
          icon: 'success',
          title: 'Recuperar',
          text: 'Se envió un correo electrónico',
        });

        $("#correoRes").val("");

      }else{
        Swal.fire({
          icon: 'info',
          title: 'Hubo un error',
          text: response['message'],
        });

      }

    });
  }

  procesarLogin(){


    if(this.email == ""){
      $("#msjResponseValid").html('<div class="alert alert-danger">Ingrese un correo electrónico</div>');
      return false;
    }

    $("#txtEmailData").attr("disabled", "true");
    $("#btnLoadingData").attr("disabled", "true");
    $("#btnLoadingData").text("Validando cuenta");

    $("#txtEmailData").removeAttr("disabled");
    $("#txtpasswordData").removeAttr("disabled");
    $("#btnLoadingData").removeAttr("disabled");
    $("#btnLoadingData").text("Acceder");
    $("#msjResponseValid").html('<div class="alert alert-success">Revise su correo electrónico</div>');
    //$("#msjResponseValid").html('<div class="alert alert-danger">'+response["message"]+'</div>');
    return false;

   /* this.authServe.consultarLogin(this.email, "").subscribe(response => {
      if(response["success"]){

        return false;
      }else{

        $("#txtEmailData").removeAttr("disabled");
        $("#txtpasswordData").removeAttr("disabled");
        $("#btnLoadingData").removeAttr("disabled");
        $("#btnLoadingData").text("Acceder");
        $("#msjResponseValid").html('<div class="alert alert-danger">'+response["message"]+'</div>');
        return false;
      }
    });*/
  }


}
