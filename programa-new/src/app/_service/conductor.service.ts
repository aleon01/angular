import { Conductor } from './../_model/Conductor';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private url: string = `${environment.HOST}/usuarios`;

  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarPaginado(page: number, size: number){
      return this.http.get<any>(`${this.url}/pageablePorRol/4/${page}/${size}`);
  }

  listarPorId(idConductor: number){
    return this.http.get<Conductor>(`${this.url}/listar/${idConductor}`);
  }

  guardar(conductor: Conductor){
    return this.http.post(`${this.url}/guardar`, conductor);
  }

  editar(conductor: Conductor){
    return this.http.put(`${this.url}/editar`, conductor);
  }

  eliminar(idConductor: number){
    return this.http.delete(`${this.url}/eliminar/${idConductor}`);
  }

  conductoresNoAsociados(idVehiculo: number){
    return this.http.get<any>(`${this.url}/listarConductorNoVehiculo/${idVehiculo}`);
  }

  conductoresAsociados(idVehiculo: number){
    return this.http.get<any>(`${this.url}/listarConductorVehiculo/${idVehiculo}`);
  }
}
