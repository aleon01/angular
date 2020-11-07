import { AsociaciondialogoComponent } from './asociaciondialogo/asociaciondialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { VehiculoService } from './../../_service/vehiculo.service';
import { Vehiculo } from './../../_model/Vehiculo';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {

  displayedColumns: string[] = ['placa', 'modelo', 'marca', 'tipoVehiuclo', 'capacidad', 'acciones'];
  dataSourceVehiculo = new MatTableDataSource<Vehiculo>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  cantidad: number;
  pageIndex: number = 0;
  pageSize: number = 5;

   constructor(private vehiculoService: VehiculoService, public route: ActivatedRoute, private snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.vehiculoService.mensajeCambio.subscribe( data => {
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
    this.vehiculoService.listarPaginado(this.pageIndex, this.pageSize).subscribe(data => {
      this.dataSourceVehiculo = new MatTableDataSource(data.content);
      this.dataSourceVehiculo.sort = this.sort;
      this.cantidad = data.totalElements;
    });
  }

  abrirDialogo(vehiculo: Vehiculo){
    const dialogRef = this.dialog.open(AsociaciondialogoComponent, {
      width: '400px',
      data: { placa: vehiculo.placa, idVehiculo: vehiculo.idVehiculo }
  });

    dialogRef.afterClosed().subscribe(result => {
      if ( result != null){
        if ( result.event === 'Cancelo'){
        }
      }
    });
  }
}
