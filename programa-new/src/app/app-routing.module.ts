import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { Not401Component } from './pages/not401/not401.component';
import { GuardianService } from './_shared/guardian.service';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { Not404Component } from './pages/not404/not404.component';
import { AgregarConductorComponent } from './pages/conductor/agregar-conductor/agregar-conductor.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AgregarVehiculoComponent } from './pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
{path: '', component: BienvenidoComponent },
{path: 'departamento', component: DepartamentoComponent, canActivate: [GuardianService]},
{path: 'ciudad', component: CiudadComponent, canActivate: [GuardianService]},
{path: 'vehiculo', component: VehiculoComponent, children : [
  {path: 'agregarvehiculo', component: AgregarVehiculoComponent},
  {path: 'editarvehiculo/:id', component: AgregarVehiculoComponent}
], canActivate: [GuardianService]},
{path: 'conductor', component: ConductorComponent, children : [
  {path: 'agregarconductor', component: AgregarConductorComponent},
  {path: 'editarconductor/:id', component: AgregarConductorComponent}
], canActivate: [GuardianService]},
{path: 'login', component: LoginComponent},
{path: 'error/:status/:message', component: ErrorComponent},
{path: 'not-401', component: Not401Component},
{path: '**', component: Not404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
