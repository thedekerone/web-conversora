import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class CodigoBPService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarCodigoBPs() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CODIGOBP, params).pipe(map(res => res ));
  }

  crearCodigoBP(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CODIGOBP, data).pipe(map(res => res));
  }

  editarCodigoBP(ruc) {
    const params = {
      "action": "editar",
      "ruc_empresa": ruc
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CODIGOBP, params).pipe(map(res => res));
  }

  actualizarCodigoBP(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CODIGOBP, data).pipe(map(res => res));
  }

  desactivarCodigoBP(ruc, estado) {
    const params = {
      "action": "cambiarEstado",
      "ruc_empresa": ruc,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CODIGOBP, params).pipe(map(res => res));
  }

}
