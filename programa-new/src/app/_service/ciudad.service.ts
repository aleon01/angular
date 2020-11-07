import { environment } from './../../environments/environment';
import { Ciudad } from 'src/app/_model/Ciudad';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private url: any = `${environment.HOST}/departamentos`;

  constructor(private http: HttpClient) { }

  listarPorDepartamentos(idDepartamento: number){
    return this.http.get<Ciudad[]>(`${this.url}/ciudad/listarPorDepartamnto/${idDepartamento}`);
  }
}
