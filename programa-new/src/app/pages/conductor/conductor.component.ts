import { Conductor } from './../../_model/Conductor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { CiudadService } from './../../_service/ciudad.service';
import { ConductorService } from './../../_service/conductor.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.component.html',
  styleUrls: ['./conductor.component.css']
})
export class ConductorComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'documento', 'nick', 'direccion', 'celular', 'correo', 'ciudad', 'acciones'];
  dataSourceConductor = new MatTableDataSource<Conductor>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;
  
  constructor(private conductorService: ConductorService, private ciudadService: CiudadService,
              public route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.conductorService.mensajeCambio.subscribe( data =>{
      this.openSnackBar(data);
      this.listarPaginado();
    });
    this.listarPaginado();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 3000,
    });
  }

  cambiarPagina(e: any){
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.listarPaginado();
  }

  listarPaginado(){
    this.conductorService.listarPaginado(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceConductor = new MatTableDataSource(data.content);
      this.dataSourceConductor.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  eliminarConductor(idUser){
    this.conductorService.eliminar(idUser).subscribe(() => {
      this.conductorService.mensajeCambio.next('Se ha eliminado el Conductor correctamente');
    });
  }

}
