import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient, private apiService: ApiService) { }


  listarProgramas() {
    const params = {
      "action": "listar"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAMA, params).pipe(map(res => res ));
  }

  crearPrograma(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAMA, data).pipe(map(res => res));
  }

  editarPrograma(cod_programa) {
    const params = {
      "action": "editar",
      "cod_programa_oncosys": cod_programa
    }

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAMA, params).pipe(map(res => res));
  }

  actualizarPrograma(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAMA, data).pipe(map(res => res));
  }

  desactivarPrograma(cod_programa, estado) {
    const params = {
      "action": "cambiarEstado",
      "cod_programa_oncosys": cod_programa,
      "estado": estado
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_MANT_PROGRAMA, params).pipe(map(res => res));
  }

}
