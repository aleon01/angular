import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  contrasena: string;

  constructor(private loginService: LoginService, private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login(this.usuario, this.contrasena).subscribe(data => {
      sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
      this.router.navigate(['']);
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Información', {
      duration: 3000,
    });
  }
}
