import { ActivatedRoute, Params, Router } from '@angular/router';
import { VehiculoService } from './../../../_service/vehiculo.service';
import { Component, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/_model/Vehiculo';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  form: FormGroup;
  private id: number;
  private edicion: boolean;


  constructor(private vehiloService: VehiculoService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
    });

    this.inicializarformulario();
    if (this.edicion === true){
      this.cargarDatos();
    }

  }
  /**
   * , Validators.pattern('[a-zA-Z]{​​​​3}​​​​-\[0-9]{​​​​3}​​​​') //formato placa
   */
  inicializarformulario(){
    this.form = new FormGroup({
      'placa': new FormControl('', [Validators.required]),
      'modelo': new FormControl(0, [Validators.required, Validators.min(2005), Validators.max(2022)]),
      'marca': new FormControl('',  [Validators.required]),
      'capacidad': new FormControl('',  [Validators.required]),
      'tipoVehiuclo': new FormControl('', [Validators.required])
    });
  }

  cargarDatos(){
    this.vehiloService.lsitarPorId(this.id).subscribe(data =>{
      this.form.get("placa").setValue(data.placa);
      this.form.get("modelo").setValue(data.modelo);
      this.form.get("marca").setValue(data.marca);
      this.form.get("capacidad").setValue(data.capacidad);
      this.form.get("tipoVehiuclo").setValue(data.tipoVehiuclo);
    });
  }

  guardar(){
    let vehiculo = new Vehiculo();
    vehiculo.placa = this.form.value['placa'];
    vehiculo.modelo = this.form.value['modelo'];
    vehiculo.marca = this.form.value['marca'];
    vehiculo.tipoVehiuclo = this.form.value['tipoVehiuclo'];
    vehiculo.capacidad = this.form.value['capacidad'];

    if ( this.edicion === true){
      vehiculo.idVehiculo = this.id;
      this.vehiloService.editar(vehiculo).subscribe(() => {
        this.form.reset();
        this.vehiloService.mensajeCambio.next('Se ha modificado el Vehiculo satisfactoriamente');
        this.router.navigate(['/vehiculo']);
      });
    }else {
      this.vehiloService.guardar(vehiculo).subscribe(() => {
        this.form.reset();
        this.vehiloService.mensajeCambio.next('Se ha guardado exitosamente el vehiculo');
        this.router.navigate(['/vehiculo']);
      });
    }
  }

  get placa(){
    return this.form.get('placa');
  }
  get modelo(){
    return this.form.get('modelo');
  }
  get marca(){
    return this.form.get('marca');
  }
  get tipoVehiuclo(){
    return this.form.get('tipoVehiuclo');
  }
  get capacidad(){
    return this.form.get('capacidad');
  }

}
