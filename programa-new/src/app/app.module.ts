import { JwtModule } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';
import { ServerErrorInterceptorService } from './_shared/server-error-interceptor.service';
import { MaterialModule } from './_material/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DepartamentoComponent } from './pages/departamento/departamento.component';
import { CiudadComponent } from './pages/ciudad/ciudad.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VehiculoComponent } from './pages/vehiculo/vehiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarVehiculoComponent } from './pages/vehiculo/agregar-vehiculo/agregar-vehiculo.component';
import { ConductorComponent } from './pages/conductor/conductor.component';
import { AgregarConductorComponent } from './pages/conductor/agregar-conductor/agregar-conductor.component';
import { AsociaciondialogoComponent } from './pages/vehiculo/asociaciondialogo/asociaciondialogo.component';
import { Not404Component } from './pages/not404/not404.component';
import { ErrorComponent } from './pages/error/error.component';
import { LoginComponent } from './pages/login/login.component';
import { Not401Component } from './pages/not401/not401.component';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';

export function tokenGetter() {
  let tk = sessionStorage.getItem(environment.TOKEN_NAME);
  return tk != null ? tk : '';
}

@NgModule({
  declarations: [
    AppComponent,
    DepartamentoComponent,
    CiudadComponent,
    VehiculoComponent,
    AgregarVehiculoComponent,
    ConductorComponent,
    AgregarConductorComponent,
    AsociaciondialogoComponent,
    Not404Component,
    ErrorComponent,
    LoginComponent,
    Not401Component,
    BienvenidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['157.230.49.177:8080'],
        blacklistedRoutes: ['http://157.230.49.177:8080/movitapp-backend-seguridad/oauth/token']
      }
    })
  ],
  entryComponents: [
    AsociaciondialogoComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
