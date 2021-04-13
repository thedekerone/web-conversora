import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './../net/ApiService';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TramaService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  listarProductos() {
    const params = {
      "action": "lista"
    }
    return this.http.post<Object>(environment.baseRoutePath, params).pipe(map(res => res));
  }

  ASD() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiService._END_POINTS.URL_GET_USER_PROFILE)
        .subscribe(
          (success) => {
            resolve(success);
          }, (error) => {
            reject(error);
          });
    });
  }

  cargarArchivoPago(extension, file, tipo_archivo, nombre_archivo) {
    const params = {
      "action": "carga_pago",
      "extension": extension,
      "file": file,
      "tipo_archivo": tipo_archivo,
      "nombre_archivo": nombre_archivo
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_UPLOAD_ARCHIVO_PAGO, params).pipe(map(res => res));
  }

  registrarTramaTmk(extension, nombre_archivo, file, canal, tipo_trama, empresa_bp,
    id_trama, id_usuario, id_tipo_trama, id_empresa) {
    const params = {
      "action": "carga_trama",
      "extension": extension,
      "nombre_archivo": nombre_archivo,
      "file": file,
      "canal": canal,
      "tipo_trama": tipo_trama,
      "empresa_bp": empresa_bp,
      "id_trama": id_trama,
      "id_usuario": id_usuario,
      "id_tipo_trama": id_tipo_trama,
      "id_empresa": id_empresa,
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_SAVE, params).pipe(map(res => res));
  }
  revisarEstadoProceso(codProceso) {
    const params = {
      "action": "proceso",
      "carga_trama": codProceso
     }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_ESTADO_CARGA_PROCESOS, params).pipe(map(res => res));
  }

  registrarTramaByS(extension, file, nombre_archivo, canal, id_canal, tipo_trama, empresa_bp,
    id_usuario, id_tipo_trama, id_empresa,
    emponcosys, capitalizado, cod_bp_vendedor, cod_convenio_bp_vendedor, cod_bp_broker,
    cod_convenio_broker, cod_bp_empresa_recaudador, cod_convenio_recaudador, canal_venta) {
    const params = {
      "action": "carga_trama",
      "extension": extension,
      "file": file,
      "nombre_archivo": nombre_archivo,
      "canal": canal,
      "id_canal": id_canal,
      "tipo_trama": tipo_trama,
      "empresa_bp": empresa_bp,
      "id_usuario": id_usuario,
      "id_tipo_trama": id_tipo_trama,
      "id_empresa": id_empresa,
      "emponcosys": emponcosys,
      "capitalizado": capitalizado,
      "cod_bp_vendedor": cod_bp_vendedor,
      "cod_convenio_bp_vendedor": cod_convenio_bp_vendedor,
      "cod_bp_broker": cod_bp_broker,
      "cod_convenio_broker": cod_convenio_broker,
      "cod_bp_empresa_recaudador": cod_bp_empresa_recaudador,
      "cod_convenio_recaudador": cod_convenio_recaudador,
      "canal_venta": canal_venta
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_SAVE, params).pipe(map(res => res));
  }

  registrarTramaGrup1(extension, nombre_archivo, file, canal, id_canal, tipo_trama, empresa_bp,
    id_usuario, id_tipo_trama, id_empresa, sede_carga, nombre_empresa,
    dp_subrogador, ruc_subrogada, subempresa) {
    const params = {
      "action": "carga_trama",
      "extension": extension,
      "nombre_archivo": nombre_archivo,
      "file": file,
      "canal": canal,
      "id_canal": id_canal,
      "tipo_trama": tipo_trama,
      "empresa_bp": empresa_bp,
      "id_usuario": id_usuario,
      "id_tipo_trama": id_tipo_trama,
      "id_empresa": id_empresa,
      "sede_carga": sede_carga,
      "nombre_empresa": nombre_empresa,
      "dp_subrogador": dp_subrogador,
      "ruc_subrogada": ruc_subrogada,
      "subempresa": subempresa
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_SAVE, params).pipe(map(res => res));
  }

  registrarTramaGrup2(extension, nombre_archivo, file, canal, id_canal, tipo_trama, empresa_bp,
    id_trama, id_usuario, id_tipo_trama, id_empresa, rol_vendedor, cod_convenio_bp_vendedor, cod_bp_broker,
    cod_convenio_broker, canal_venta, form_plan, tipo_via, nombre_via, nombre_via2, nombre_via3, campo_manual, form_manzana,
    form_lote, form_dpt, form_sector, form_urbanizacion, form_departamento, form_provincia,
    form_distrito, form_referencia, form_telefono, form_celular,convenioRolCliente,nroIdentificacion,numero_convenio,
     codigoBPSede, codBpRolCliente, tipoempresa,rucSubrogada, nombreEmpresa,razonSocialSubrogado, bpSapSubrogador,descripcionSede) {
    const params = {
      "action": "carga_trama",
      "extension": extension,
      "nombre_archivo": nombre_archivo,
      "file": file,
      "canal": canal,
      "id_canal": id_canal,
      "tipo_trama": tipo_trama,
      "empresa_bp": empresa_bp+"",
      "id_trama": id_trama,
      "id_usuario": id_usuario,
      "id_tipo_trama": id_tipo_trama,
      "id_empresa": id_empresa,
      "nro_identificacion": nroIdentificacion,
      "rol_empresa": tipoempresa,
      "numero_convenio": numero_convenio,
      "cod_bp_rol_cliente": codBpRolCliente,
      "convenio_rol_cliente": convenioRolCliente,
      "cod_bp_vendedor": rol_vendedor,
      "cod_convenio_bp_vendedor": cod_convenio_bp_vendedor,
      "cod_bp_broker": cod_bp_broker?cod_bp_broker:"0",
      "cod_convenio_broker": cod_convenio_broker?cod_convenio_broker:"0",
      "cod_bp_sede": codigoBPSede+"",
      "canal_venta": canal_venta,
      "form_plan": form_plan?form_plan:"0",
      "tipo_via": tipo_via,
      "nombre_via": nombre_via,
      "nombre_via2": nombre_via2,
      "nombre_via3": nombre_via3,
      "campo_manual": campo_manual,
      "form_manzana": form_manzana?form_manzana:"0",
      "form_lote": form_lote?form_lote:"0",
      "form_dpt": form_dpt?form_dpt:"0",
      "form_sector": form_sector?form_sector:"0",
      "form_urbanizacion": form_urbanizacion,
      "form_departamento": form_departamento,
      "form_provincia": form_provincia,
      "form_distrito": form_distrito,
      "form_referencia": form_referencia,
      "form_telefono": form_telefono,
      "form_celular": form_celular,
      "sede_carga": descripcionSede,
      "nombre_empresa": nombreEmpresa,
      "dp_subrogador": bpSapSubrogador,
      "ruc_subrogada": rucSubrogada,
      "subempresa": descripcionSede
    }
    console.log(params)
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_SAVE, params).pipe(map(res => res));
  }

}
