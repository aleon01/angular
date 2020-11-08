import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  isLogged: boolean;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  logininicio(){
    this.loginService.cerrarSesion();
    const user = this.loginService.estaLogueado();
    if (user){​​​​​
      this.isLogged = true;
    }​​​​​
  }

}
