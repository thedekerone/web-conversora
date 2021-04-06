import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class CuentaContableService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarContables() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONTABLES, params).pipe(map(res => res ));
  }

  crearContable(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONTABLES, data).pipe(map(res => res));
  }

  editarContable(id_cuenta_contable) {
    const params = {
      "action": "editar",
      "id_cuenta_contable": id_cuenta_contable
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONTABLES, params).pipe(map(res => res));
  }

  actualizarContable(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONTABLES, data).pipe(map(res => res));
  }

  desactivarContable(id_cuenta_contable, estado) {
    const params = {
      "action": "cambiarEstado",
      "id_cuenta_contable": id_cuenta_contable,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_CONTABLES, params).pipe(map(res => res));
  }

}
