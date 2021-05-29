import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {
//   public _END_POINTS = {
//     BASE_ROUTE_PATH: `${environment.baseRoute}`,
//     BASE_ROUTE_PATH_HISTORY: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-historico`,
//     BASE_ROUTE_PATH_CMR: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-plan-cmr`,
//     BASE_ROUTE_PATH_EMP: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-empresa`,
//     BASE_ROUTE_PATH_UPLOAD_ARCHIVO_PAGO: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-cargararchivopago`,
//     URL_GET_USER_PROFILE: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-usuario`,
//     URL_GET_COMPANY: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-sapws`,
//     URL_GET_TYPE_OF_PAY_BY_COMPANY: `${environment.baseRoutePath}/api-usuario-conversor`,
//     BASE_ROUTE_PATH_PUNTUACION: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-puntuaciones`,
//     BASE_ROUTE_PATH_REPORTES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-reportes`,
//     BASE_ROUTE_PATH_MANT_PROGRAMA: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-programa`,
//     BASE_ROUTE_PATH_SAVE: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-trama`,
//     BASE_ROUTE_PATH_MANT_DJS: `${environment.baseRoutePathMantDjs}/dev-conversor-declaracionjs`,
//     BASE_ROUTE_PATH_MANT_LPPD: `${environment.baseRoutePathMantLppd}/dev-conversor-lddp`,
//     BASE_ROUTE_PATH_MANT_CONVENIO: `${environment.baseRoutePathMantConvenio}/dev-conversor-convenio`,
//     BASE_ROUTE_PATH_MANT_CODIGOBP: `${environment.baseRoutePathMantCodigoBP}/dev-conversor-codigobp`,
//     BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR: `${environment.baseRoutePathMantGrupoVendedor}/dev-conversor-grupovendedor`,
//     BASE_ROUTE_PATH_MANT_CAMPANAS: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-eq-plancampana`,
//     BASE_ROUTE_PATH_MANT_CONTABLES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-cuentacontables`,
//     BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-programagrupales`,
//     BASE_ROUTE_PATH_ESTADO_CARGA_PROCESOS: `https://o3e12qm1ve.execute-api.us-east-1.amazonaws.com/qas/qas-api-trama`,
//   };
// }

// dev

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public _END_POINTS = {
    BASE_ROUTE_PATH:
      'https://12rz1lnwih.execute-api.us-east-1.amazonaws.com/dev/api-usuario-conversor',
    BASE_ROUTE_PATH_HISTORY: `https://hsv2kdz035.execute-api.us-east-1.amazonaws.com/dev/dev-conversor-historico-re`,
    BASE_ROUTE_PATH_CMR: `https://6ulcu7tae1.execute-api.us-east-1.amazonaws.com/dev/Dev_Conversor_Plan_Cmr`,
    BASE_ROUTE_PATH_EMP: `https://0bzixd5zu7.execute-api.us-east-1.amazonaws.com/dev/api-conversor-empresa`,
    BASE_ROUTE_PATH_SAVE: `https://5tdfrp6542.execute-api.us-east-1.amazonaws.com/dev/api-conversor-trama-dev`,
    BASE_ROUTE_PATH_UPLOAD_ARCHIVO_PAGO: `https://hxocvwko7c.execute-api.us-east-1.amazonaws.com/dev/dev-conversor-cargaarchivo`,
    URL_GET_USER_PROFILE: `ttps://12rz1lnwih.execute-api.us-east-1.amazonaws.com/dev/api-usuario-conversor`,
    URL_GET_COMPANY: `${environment.baseRouteCompany}/dev-conversor-sapws`,
    URL_GET_TYPE_OF_PAY_BY_COMPANY: `ttps://12rz1lnwih.execute-api.us-east-1.amazonaws.com/dev/api-usuario-conversor`,
    BASE_ROUTE_PATH_PUNTUACION: `${environment.baseRoutePuntuaciones}/dev-conversor-puntuaciones`,
    BASE_ROUTE_PATH_REPORTES: `${environment.baseRouteReportes}/dev-conversor-reportes`,
    BASE_ROUTE_PATH_MANT_PROGRAMA: `${environment.baseRoutePathMantPrograma}/dev-conversor-programa`,
    BASE_ROUTE_PATH_MANT_DJS: `${environment.baseRoutePathMantDjs}/dev-conversor-declaracionjs`,
    BASE_ROUTE_PATH_MANT_LPPD: `${environment.baseRoutePathMantLppd}/dev-conversor-lddp`,
    BASE_ROUTE_PATH_MANT_CONVENIO: `${environment.baseRoutePathMantConvenio}/dev-conversor-convenio`,
    BASE_ROUTE_PATH_MANT_CODIGOBP: `${environment.baseRoutePathMantCodigoBP}/dev-conversor-codigobp`,
    BASE_ROUTE_PATH_MANT_GRUPOVENDEDOR: `${environment.baseRoutePathMantGrupoVendedor}/dev-conversor-grupovendedor`,
    BASE_ROUTE_PATH_MANT_CAMPANAS: `${environment.baseRoutePathMantCampanas}/dev-conversora-plancampana`,
    BASE_ROUTE_PATH_MANT_CONTABLES: `${environment.baseRoutePathMantContables}/dev-conversor-cuentacontables`,
    BASE_ROUTE_PATH_MANT_PROGRAM_GRUPALES: `${environment.baseRoutePathMantProgramGrupales}/dev-api-conversor-cargaarchivo`,
    BASE_ROUTE_PATH_ESTADO_CARGA_PROCESOS: `${environment.baseRoutePathProcessState}/api-conversor-trama-dev`,
  };
}
