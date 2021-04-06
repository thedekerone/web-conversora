import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class LddpService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarLddps() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_LPPD, params).pipe(map(res => res ));
  }

  crearLddp(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_LPPD, data).pipe(map(res => res));
  }

  editarLddp(cod_empresa) {
    const params = {
      "action": "editar",
      "ruc_empresa": cod_empresa
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_LPPD, params).pipe(map(res => res));
  }

  actualizarLddp(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_LPPD, data).pipe(map(res => res));
  }

  desactivarLddp(ruc_empresa, estado) {
    const params = {
      "action": "cambiarEstado",
      "ruc_empresa": ruc_empresa,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_LPPD, params).pipe(map(res => res));
  }

}
