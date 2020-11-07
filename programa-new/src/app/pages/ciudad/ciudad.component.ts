import { DepartamentoService } from './../../_service/departamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Ciudad } from 'src/app/_model/Ciudad';
import { CiudadService } from './../../_service/ciudad.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {

  selectedValue: any;
  dataSource: any[];

  idDepartamento: number;

  displayedColumns: any[] = ['idCiudad', 'nombre'];
  dataSourceCiudades = new MatTableDataSource<Ciudad>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private ciudadService: CiudadService, private departamentoService: DepartamentoService) { }

  idDepar(event){
    this.selectedValue = event.idDepartamento;
    this.ciudadService.listarPorDepartamentos(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudades = new MatTableDataSource(data);
      this.dataSourceCiudades.paginator = this.paginator;
      this.dataSourceCiudades.sort = this.sort;
    });
   }

  ngOnInit(): void {
    this.departamentoService.listar().subscribe(res => {
      this.dataSource = res;
    });
  }

}
