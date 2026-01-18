import { Component } from '@angular/core';
import { ServicioTexto } from '../../services/servicio-texto';

@Component({
  selector: 'app-carrera',
  imports: [],
  templateUrl: './carrera.html',
  styleUrl: './carrera.less',
})
export class Carrera {

  private _servicioCarrera: ServicioTexto;
  textoDesplegado: string= "";
  
  constructor(servicioCarrera: ServicioTexto) {
    this._servicioCarrera = servicioCarrera;

    this.textoDesplegado= this._servicioCarrera.recuperarLeccion();
  }
}