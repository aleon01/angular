import { LoginService } from './_service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conductores';

  constructor(private loginService: LoginService){}

  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
