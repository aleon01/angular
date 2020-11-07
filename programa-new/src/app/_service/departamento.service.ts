import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Departamento } from '../_model/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url: string = `${environment.HOST}/departamentos`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Departamento[]>(`${this.url}/listar`);
  }

}
