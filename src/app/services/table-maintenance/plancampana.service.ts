import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class PlanCampanaService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarCampanas() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CAMPANAS, params).pipe(map(res => res ));
  }

  crearCampanas(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CAMPANAS, data).pipe(map(res => res));
  }

  editarCampanas(procedencia, cod_empresa) {
    const params = {
      "action": "editar",
      "procedencia": procedencia,
      "cod_empresa": cod_empresa,
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CAMPANAS, params).pipe(map(res => res));
  }

  actualizarCampanas(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CAMPANAS, data).pipe(map(res => res));
  }

  desactivarCampanas(procedencia, cod_empresa, estado) {
    const params = {
      "action": "cambiarEstado",
      "procedencia": procedencia,
      "cod_empresa": cod_empresa,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CAMPANAS, params).pipe(map(res => res));
  }

}
