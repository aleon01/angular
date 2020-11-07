import { environment } from './../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './../_service/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    const helper = new JwtHelperService();
    const rpta = this. loginService.estaLogueado();

    if (rpta){

      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if (!helper.isTokenExpired(token)){

        const url = state.url;
        const decodedToken = helper.decodeToken(token);
        const rol: string = decodedToken.authorities[0];
        
        if (url.includes('/departamento') && rol === 'Administrador'){
          return true;
        } else if (url.includes('/ciudad') && rol === 'Administrador'){
          return true;
        } else if (url.includes('/vehiculo') && rol === 'Despachador'){
          return true;
        } else if (url.includes('/conductor') && rol === 'Administrador'){
          return true;
        }

        this.router.navigate(['not-401']);
        return false;

      } else {
        this.loginService.cerrarSesion();
        return  false;
      }
    } else {
      this.router.navigate(['not-401']);
      return false;
    }
  }
}
