import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from './../net/ApiService';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient, private apiService: ApiService, private authSer: AuthService) { }

  listarHistorial() {
    var params
    if(this.authSer.getIDRol() == 1){
        params = {"action": "historico"}
    }else{
      params = {"action": "historico","usuario": this.authSer.getIdusuario()}
    }
    console.log(params);

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_HISTORY, params).pipe(map(res => res));
  }

  listarLog(id_carga_trama) {
    const params = {
      "action": "log",
      "id_carga_trama": id_carga_trama
    }
    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH_HISTORY, params).pipe(map(res => res));
  }
}
