import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from './../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarProductos() {
    const params = {
      "action": "lista"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarEmpresas() {
    const params = {
      "action": "empresas",
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarEmpresa(empresa) {
    const params = {
      "action": "datosEmpresa",
      "empresa": empresa
    }
    return this.http.post<Object>(this.apiService._END_POINTS.URL_GET_COMPANY, params).pipe(map(res => res));
  }

  listarEmpresaCanal(id_canal) {
    const params = {
      "action": "listar",
      "idCanal": id_canal
  }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

  crearUsuario(data) {

    console.log("dataRegister",data)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, data).pipe(map(res => res));
  }

  actualizarUsuario(data) {

    console.log("dataUpdate",data)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, data).pipe(map(res => res));
  }

  desactivarUsuario(id_usuario, estado) {
    const params = {
      "action": "acceso",
      "id_usuario": id_usuario,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarPerfil(userid) {
    const params = {
      "action": "perfil",
      "usuario": userid
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarCanales() {
    const params = {
      "action": "listaCanales"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  actualizarPermiso(operacion,id_usuario,estado) {
    const params = {
      "action": "permisos",
      "operacion": operacion,
      "usuario": id_usuario,
      "estado": estado
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }


}
