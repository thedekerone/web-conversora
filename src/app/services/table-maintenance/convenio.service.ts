import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarConvenios() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONVENIO, params).pipe(map(res => res ));
  }

  crearConvenio(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONVENIO, data).pipe(map(res => res));
  }

  editarConvenio(ruc) {
    const params = {
      "action": "editar",
      "ruc_empresa": ruc
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONVENIO, params).pipe(map(res => res));
  }

  actualizarConvenio(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONVENIO, data).pipe(map(res => res));
  }

  desactivarConvenio(ruc, estado) {
    const params = {
      "action": "cambiarEstado",
      "ruc_empresa": ruc,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONVENIO, params).pipe(map(res => res));
  }

}
