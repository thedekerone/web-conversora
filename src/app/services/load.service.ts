import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../net/ApiService';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor(private http: HttpClient, private apiService: ApiService, private authSer: AuthService) { }

  listarCanales(id_usuario) {
    const params = {
      "action": "canal",
      "usuario": id_usuario
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarTipoArchivo(id_canal) {
    const params = {
      "action": "tipoArchivo",
      "canal": id_canal
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarEmpresaTipoArchivo(tipo_archivo) {
    const params = {
      "action": "empresas",
      "tipoArchivo": tipo_archivo
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarEmpresa(tipoIdentificacion, nroIdentificacion, codigoEmpresa, razonSocial, rol, grupo_vendedor, numero_convenio) {
    const params = {
      "action": "datosEmpresa",
      "tipoIdentificacion": tipoIdentificacion,
      "nroIdentificacion": "10020140122",
      "codigoEmpresa": "",
      "razonSocial": razonSocial,
      "rol": rol,
      "grupo_vendedor": grupo_vendedor,
      "numero_convenio": numero_convenio
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.URL_GET_COMPANY, params).pipe(map(res => res));
  }

  listarTipoPagoEmpresa(id_empresa) {
    const params = {
      "action": "tipoPago",
      "empresa": id_empresa
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }

  listarTipoEmpresa(tipoArchivo, tipo) {
    const params = {
      "action": "empresasList",
      "tipoArchivo": tipoArchivo,
      "opcion": tipo
    }
    console.log(params);
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, params).pipe(map(res => res));
  }
}
