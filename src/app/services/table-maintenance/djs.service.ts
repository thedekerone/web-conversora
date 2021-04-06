import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class DjsService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarDeclaraciones() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_DJS, params).pipe(map(res => res ));
  }

  crearDeclaracion(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_DJS, data).pipe(map(res => res));
  }

  editarDeclaracion(ruc) {
    const params = {
      "action": "editar",
      "ruc_empresa": ruc
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_DJS, params).pipe(map(res => res));
  }

  actualizarDeclaracion(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_DJS, data).pipe(map(res => res));
  }

  desactivarDeclaracion(ruc, estado) {
    const params = {
      "action": "cambiarEstado",
      "ruc_empresa": ruc,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_DJS, params).pipe(map(res => res));
  }

}
