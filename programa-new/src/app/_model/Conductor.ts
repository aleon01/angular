import { Ciudad } from './Ciudad';
import { Rol } from './Rol';
import { TipoDocumento } from './TipoDocumento';
export class Conductor{
    idUsuario: number;
    documento: string;
    nombre: string;
    apellido: string;
    nick: string;
    clave: string;
    estado: boolean;
    cambioContrasena: boolean;
    nombreEmpresa: string;
    direccion: string;
    cargo: string;
    telefono: string;
    celular: string;
    celularAux: string;
    correo: string;
    tipoDocumento = new TipoDocumento();
    rol = new Rol();
    ciudad: Ciudad;
}