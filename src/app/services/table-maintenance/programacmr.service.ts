import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ProgramaCmrService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarCmr() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_CMR, params).pipe(map(res => res ));
  }

  crearCmr(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_CMR, data).pipe(map(res => res));
  }

  editarCmr(producto_cmr, programa_cmr) {
    const params = {
      "action": "editar",
      "producto_cmr": producto_cmr,
      "programa_cmr": programa_cmr
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_CMR, params).pipe(map(res => res));
  }

  actualizarCmr(data) {
    
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_CMR, data).pipe(map(res => res));
  }

  cambiarEstadoCmr(producto_cmr, programa_cmr, estado) {
    const params = {
      "action": "cambiarEstado",
      "producto_cmr": producto_cmr,
      "programa_cmr": programa_cmr,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_CMR, params).pipe(map(res => res));
  }

}