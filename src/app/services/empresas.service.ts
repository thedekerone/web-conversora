import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from './../net/ApiService';

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarEmpresas(idCanal) {
    const params = {
      "action": "listar",
      "idCanal": idCanal
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res ));
  }

  crearEmpresas(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, data).pipe(map(res => res));
  }

  editarEmpresas(producto_cmr) {
    const params = {
      "action": "editar",
      "producto_cmr": producto_cmr,

    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

  listarSubrogados(empresa) {
    const params = {
      "action": "listarSubrogadas",
      "empresa": empresa,

    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

  actualizarEmpresas(data) {
    
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, data).pipe(map(res => res));
  }

  actualizarSubrogados(data) {
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, data).pipe(map(res => res));
  }

  cambiarEstadoEmpresas(id_empresa, estado) {
    const params = {
      "action": "cambiarEstado",
      "id_empresa": id_empresa,
      "estado": estado
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

  agregarSubrogado(id_empresa, subrogador, ruc_subrogador, razon_social_subrogador, ruc_subrogado, bp_sap_subrogador) {
    const params = {
      "action": "crearSub",
      "id_empresa": id_empresa,
      "subrogador": subrogador,
      "ruc_subrogador": ruc_subrogador,
      "razon_social_subrogado": razon_social_subrogador,
      "ruc_subrogado": ruc_subrogado,
      "bp_sap_subrogador": bp_sap_subrogador
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

  cambiarEstadoEmpresaSub(subrogada, estado) {
    const params = {
        "action": "cambiarEstadoSub",
        "subrogada": subrogada,
        "estado": estado
    
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_EMP, params).pipe(map(res => res));
  }

}