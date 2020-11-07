import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup } from '@angular/forms';
import { Asociacion } from './../../../_model/Asociacion';
import { VehiculoService } from './../../../_service/vehiculo.service';
import { MatTableDataSource } from '@angular/material/table';
import { ConductorService } from './../../../_service/conductor.service';
import { Vehiculo } from './../../../_model/Vehiculo';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conductor } from 'src/app/_model/Conductor';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asociaciondialogo',
  templateUrl: './asociaciondialogo.component.html',
  styleUrls: ['./asociaciondialogo.component.css']
})
export class AsociaciondialogoComponent implements OnInit {

  idVehiculo: number;
  idUsuario: number;
  selectedValue: any;
  dataSource: any[];
  dataSourceSelect: any[];
  private id: any;
  vehiculo: Vehiculo;

  ids: number;
  displayedColumns: any[] = ['nombre', 'apellido', 'documento', 'acciones'];
  dataSourceConductores = new MatTableDataSource<Conductor>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<AsociaciondialogoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Vehiculo,
              private conductorService: ConductorService,
              private route: ActivatedRoute,
              private vehiloService: VehiculoService) {}

  ngOnInit(): void {
    this.idVehiculo = this.data.idVehiculo;
    this.cargarDatosTabla();
    this.listaNoAsociados();
  }

  cerrarDialogo(){
    this.dialogRef.close({event: 'Cancelo'});
  }

  cargarDatosTabla(){
    this.conductorService.conductoresAsociados(this.idVehiculo).subscribe(res => {
      this.dataSourceConductores = new MatTableDataSource(res);
      this.dataSourceConductores.paginator = this.paginator;
      this.dataSourceConductores.sort = this.sort;
    });
  }

  listaNoAsociados(){
    this.conductorService.conductoresNoAsociados(this.idVehiculo).subscribe(data => {
      this.dataSourceSelect = data;
    });
  }

  desasociar(idUser: number){
    let desasociar = new Asociacion();
    desasociar.idUsuario = idUser;
    desasociar.idVehiculo = this.data.idVehiculo;
    this.vehiloService.desasociarVehiculo(desasociar).subscribe(() => {
      this.vehiloService.mensajeCambio.next('Se ha eliminado el conductor de este vehiculo');
      this.cargarDatosTabla();
      this.listaNoAsociados();
    });
  }

  idSelect(event){
    this.selectedValue = event.idUsuario;
  }

  Asociar(){
    let asociacion = new Asociacion();
    asociacion.idUsuario = this.idUsuario;
    asociacion.idVehiculo = this.data.idVehiculo;
    this.vehiloService.asociarVehiculos(asociacion).subscribe(() => {
      this.vehiloService.mensajeCambio.next('Se asocio el conductor a este vehiculo');
      this.cargarDatosTabla();
      this.listaNoAsociados();
    });
  }
}
