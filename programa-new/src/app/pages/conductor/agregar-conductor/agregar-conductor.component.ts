import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Departamento } from 'src/app/_model/Departamento';
import { TipoDocumento } from './../../../_model/TipoDocumento';
import { Rol } from './../../../_model/Rol';
import { DepartamentoService } from './../../../_service/departamento.service';
import { CiudadService } from './../../../_service/ciudad.service';
import { Conductor } from 'src/app/_model/Conductor';
import { ConductorService } from './../../../_service/conductor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/_model/Ciudad';

@Component({
  selector: 'app-agregar-conductor',
  templateUrl: './agregar-conductor.component.html',
  styleUrls: ['./agregar-conductor.component.css']
})
export class AgregarConductorComponent implements OnInit {

  formConductor: FormGroup;
  private id: number;
  private edicion: boolean;

  selectedValue: any;
  dataSource: Departamento[];
  dataSourceCiudad: Ciudad[];

  idDepartamento: number;
  ciudad: Ciudad;

  constructor(private conductorservice: ConductorService, private ciudadService: CiudadService,
              private departamentoService: DepartamentoService, private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarformulario();
    if (this.edicion === true){
      this.cargarDatos();
    }
    this.departamentoService.listar().subscribe(res => {
      this.dataSource = res;
    });
  }

  inicializarformulario(){
    this.formConductor = new FormGroup({
      'documento': new FormControl('',  [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'apellido': new FormControl('', [Validators.required]),
      'nick': new FormControl('',  [Validators.required]),
      'clave': new FormControl('', [Validators.required]),
      'direccion': new FormControl('', [Validators.required]),
      'celular': new FormControl('', [Validators.required]),
      'celularAux': new FormControl('', [Validators.required]),
      'correo': new FormControl('', [Validators.required]),
      'ciudadReg': new FormControl(Ciudad, [Validators.required]),
    });
  }

  cargarDatos(){
    this.conductorservice.listarPorId(this.id).subscribe(data =>{
      this.formConductor.get("documento").setValue(data.documento);
      this.formConductor.get("nombre").setValue(data.nombre);
      this.formConductor.get("apellido").setValue(data.apellido);
      this.formConductor.get("nick").setValue(data.nick);
      this.formConductor.get("clave").setValue(data.clave);
      this.formConductor.get("direccion").setValue(data.direccion);
      this.formConductor.get("celular").setValue(data.celular);
      this.formConductor.get("celularAux").setValue(data.celularAux);
      this.formConductor.get("correo").setValue(data.correo);
      this.formConductor.get("ciudadReg").setValue(data.ciudad);
    });
  }

  idDepar(event){
    this.selectedValue = event.idDepartamento;
    this.ciudadService.listarPorDepartamentos(this.idDepartamento).subscribe(data => {
      this.dataSourceCiudad = data;
    });
  }

  guardar(){
    let conductor = new Conductor();
    conductor.documento = this.formConductor.value['documento'];
    conductor.nombre = this.formConductor.value['nombre'];
    conductor.apellido = this.formConductor.value['apellido'];
    conductor.nick = this.formConductor.value['nick'];
    conductor.clave = this.formConductor.value['clave'];
    conductor.direccion = this.formConductor.value['direccion'];
    conductor.celular = this.formConductor.value['celular'];
    conductor.celularAux = this.formConductor.value['celularAux'];
    conductor.correo = this.formConductor.value['correo'];
    let tipoDocumento = new TipoDocumento();
    conductor.tipoDocumento = tipoDocumento;
    let rolCond = new Rol();
    conductor.rol = rolCond;
    conductor.ciudad = this.formConductor.value['ciudadReg'];

    if ( this.edicion === true){
      conductor.idUsuario = this.id;
      this.conductorservice.editar(conductor).subscribe(() => {
        this.formConductor.reset();
        this.conductorservice.mensajeCambio.next('Se ha modificado el Conductor satisfactoriamente');
        this.router.navigate(['./conductor']);
      });
    }else {
      this.conductorservice.guardar(conductor).subscribe(() => {
        this.formConductor.reset();
        this.conductorservice.mensajeCambio.next('Se ha guardado exitosamente el conductor');
        this.router.navigate(['/conductor']);
      });
    }
  }

  get nombre(){
    return this.formConductor.get('nombre');
  }
  get apellido(){
    return this.formConductor.get('apellido');
  }
  get documento(){
    return this.formConductor.get('documento');
  }
  get nick(){
    return this.formConductor.get('nick');
  }
  get clave(){
    return this.formConductor.get('clave');
  }
  get direccion(){
    return this.formConductor.get('direccion');
  }
  get celular(){
    return this.formConductor.get('celular');
  }
  get celularAux(){
    return this.formConductor.get('celularAux');
  }
  get correo(){
    return this.formConductor.get('correo');
  }
  get ciudadReg(){
    return this.formConductor.get('ciudadReg');
  }
}
