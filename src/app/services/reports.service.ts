import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from './../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  cantidadRechazados() {
    const params = {
      "action": "rechazados"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_PUNTUACION, params).pipe(map(res => res));
  }

  cantidadExitosos() {
    const params = {
      "action": "procesadosCorrectamente"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_PUNTUACION, params).pipe(map(res => res));
  }

  cantidadWebConversora() {
    const params = {
      "action": "procesadosWebConversora"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_PUNTUACION, params).pipe(map(res => res));
  }

  cantidadSubidos() {
    const params = {
      "action": "subidos"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_PUNTUACION, params).pipe(map(res => res));
  }

  reporteAltaByC() {
    const params = {
      "action": "altaByC"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }

  reporteRecaudoByC() {
    const params = {
      "action": "recaudoByC"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }

  reporteBajaByC() {
    const params = {
      "action": "bajaByC"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }

  reporteGrupales() {
    const params = {
      "action": "grupales"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }

  reporteTelemarketing() {
    const params = {
      "action": "telemarketing"
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }

  duracionTiempoTransc(tipo_trama) {
    const params = {
      "action": "duracion",
      "tipo_trama": tipo_trama
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_REPORTES, params).pipe(map(res => res));
  }
}
