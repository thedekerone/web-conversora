import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from '../net/ApiService';

@Injectable({
  providedIn: 'root'
})
export class RecoverService {

  constructor(private http: HttpClient, private apiService: ApiService) { }

  recuperarClave(data) {

    return this.http.post<Object>(this.apiService._END_POINTS.BASE_ROUTE_PATH, data).pipe(map(res => res));
  }
}
