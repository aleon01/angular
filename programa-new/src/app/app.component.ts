import { LoginService } from './_service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Conductores';

  isLogged: boolean;

  constructor(private loginService: LoginService){}

  cerrarSesion(){
    this.loginService.cerrarSesion();
    const user = this.loginService.estaLogueado();
    if (user){​​​​​
      this.isLogged = true;
    }​​​​​
  }
}
