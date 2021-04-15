import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public credenciales;
  listaPermiso=[];

  constructor(private http: HttpClient, private userServ: UsersService) { }
  

  consultarLogin(email, password) {
    const params = {
      "action": "login",
      "correo": email,
      "clave": password
    }
    return this.http.post<Object>(environment.lambda_acceso, params).pipe(map(res => res));
  }

  
  loggedIn() {
    if (localStorage.getItem('zxc21dsrty5uyj11j1') == null) {
      return false;
    } else {
      return true;
    }
  }

  actualizarUsuario(){
    this.userServ.listarPerfil(this.getIdusuario()).subscribe((response) => {
      console.log(response);
      this.listaPermiso = response['data'][0]['permisos'];
 
    })
  }

  obtenerUsuario(){

    this.credenciales =  JSON.parse(localStorage.getItem('zxc21dsrty5uyj11j1'));
  }

  getIdusuario() {
    this.obtenerUsuario();
    return this.credenciales['id_usuario'];
  }
  getIDCanal() {
    this.obtenerUsuario();
    return this.credenciales['id_canal'];
  }
  getCanal() {
    this.obtenerUsuario();
    return this.credenciales['canal'];
  }
  getIDEmpresa() {
    this.obtenerUsuario();
    return this.credenciales['empresa'];
  }
  getEmpresa() {
    this.obtenerUsuario();
    return this.credenciales['id_empresa'];
  }
  getIDRol() {
    this.obtenerUsuario();
    return this.credenciales['id_rol'];
  }
  getRol() {
    this.obtenerUsuario();
    return this.credenciales['rol'];
  }
  getNombres() {
    this.obtenerUsuario();
    return this.credenciales['nombre'];
  }
  getApellidos() {
    this.obtenerUsuario();
    return this.credenciales['apellido_paterno'] + " " +this.credenciales['apellido_materno'];
  }
  getFechaNacimiento() {
    this.obtenerUsuario();
    return this.credenciales['fecha_nacimiento'];
  }
  getTipoDocumento() {
    this.obtenerUsuario();
    return this.credenciales['tipo_documento'];
  }
  getDocumento() {
    this.obtenerUsuario();
    return this.credenciales['documento'];
  }
  getEmail() {
    this.obtenerUsuario();
    return this.credenciales['correo'];
  }
  getTipo() {
    this.obtenerUsuario();
    return this.credenciales['tipo'];
  }
  getPermisos() {
    this.obtenerUsuario();
    return this.credenciales['permisos'];
  }

  mostrarTelemarketing(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "1"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }

  

  mostrarBancaSeguros(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "2"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }

  mostrarGrupales(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "3"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }


  mostrarCrearUsuarios(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "4"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }

  mostrarEquivalencia(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "5"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }


  mostrarSubrogada(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "7"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }

  mostrarMantenimientoGrupales(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "8"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }
  mostrarMantenimientoTelemarketing(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "9"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }
  mostrarMantenimientoBancaSeguros(){
    this.obtenerUsuario();
    var permisos =  this.credenciales['permisos'];
    var permitido = false;
    for (let index = 0; index < permisos.length; index++) {
      if(permisos[index]["id_operacion"] == "10"){
        if(permisos[index]["estado"] == "1"){
          permitido = true;
        }
      }      
    }
    return permitido;
  }


  usuarioRol(){
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var permisos = this.credenciales['permisos']
    var rol = false;
    if(roles == "Negocio") {
      rol = true;
    } else if(roles == "SP") {
      rol = true;
    } else if(roles == "Canal") {
     
    }
    return rol;
  }

  usuarioRolCargaTrama() {
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var permisos = this.credenciales['permisos']
    var rol = false;
    if(roles == "Negocio") {
      rol = true;
    } else if(roles == "Canal") {
      permisos.forEach(element => {
        if(element.estado == 1) {
          if(element.id_operacion == 1 || element.id_operacion == 2 || element.id_operacion == 3 || element.id_operacion == 7) {
              rol = true;
          }
        }
      });
    } else if(roles == "SP") {
      rol = true;
    } 
    return rol;
  }

  usuarioRolRepTrama() {
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var rol = false;
    if(roles == "Negocio") {
      rol = true;
    } else if(roles == "Canal") {
      rol = false;
    } else if(roles == "SP") {
      rol = true;
    } 
    return rol;
  }

  usuarioRolMantEmpresas() {
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var permisos = this.credenciales['permisos']
    var rol = false;
    if(roles == "Negocio") {
      permisos.forEach(element => {
        if(element.estado == 1) {
          if(element.id_operacion == 8 || element.id_operacion == 9) {
              rol = true;
          }
        }
      });
    } else if(roles == "Canal") {
      rol = false;
    } else if(roles == "SP") {
      rol = true;
    } 
    return rol;
  }

  usuarioRolMantEquiv() {
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var permisos = this.credenciales['permisos']
    var rol = false;
    if(roles == "Negocio") {
      permisos.forEach(element => {
        if(element.estado == 1) {
          if(element.id_operacion == 5) {
              rol = true;
          
          }
        }
      });
    } else if(roles == "Canal") {
      rol = false;
    } else if(roles == "SP") {
      rol = true;
    } 
    return rol;
  }

  usuarioRolMantUsua() {
    this.obtenerUsuario();
    var roles =  this.credenciales['rol']; 
    var permisos = this.credenciales['permisos']
    var rol = false;
    if(roles == "Negocio") {
      permisos.forEach(element => {
        if(element.estado == 1) {
          if(element.id_operacion == 4) {
              rol = true;
          }
        }
      });
    } else if(roles == "Canal") {
      rol = false;
    } else if(roles == "SP") {
      rol = true;
    } 
    return rol;
  }
  
}
