import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class GrupoVendedorService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarGrupoVendedores() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR, params).pipe(map(res => res ));
  }

  crearGrupoVendedor(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR, data).pipe(map(res => res));
  }

  editarGrupoVendedor(cod_empresa) {
    const params = {
      "action": "editar",
      "cod_empresa": cod_empresa
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR, params).pipe(map(res => res));
  }

  actualizarGrupoVendedor(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR, data).pipe(map(res => res));
  }

  desactivarGrupoVendedor(cod_empresa, estado) {
    const params = {
      "action": "cambiarEstado",
      "cod_empresa": cod_empresa,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR, params).pipe(map(res => res));
  }

}
