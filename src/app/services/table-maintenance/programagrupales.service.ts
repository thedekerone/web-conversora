import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ProgramaGrupalesService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarPGs() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES, params).pipe(map(res => res ));
  }

  crearPG(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES, data).pipe(map(res => res));
  }

  editarPG(id_programa_grupales) {
    const params = {
      "action": "editar",
      "id_programa_grupales": id_programa_grupales
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES, params).pipe(map(res => res));
  }

  actualizarPG(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES, data).pipe(map(res => res));
  }

  desactivarPG(id_programa_grupales, estado) {
    const params = {
      "action": "cambiarEstado",
      "id_programa_grupales": id_programa_grupales,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES, params).pipe(map(res => res));
  }

}
