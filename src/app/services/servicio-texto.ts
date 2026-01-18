import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicioTexto {

  private _carreraActual: string = "";
  private _carreraTerminada: boolean = false;
  private siguientePosicion: number = 0;
  public esTextoValido(caracter: string): boolean {

    if (caracter == "") {
      return false;
    }

    if (this.siguientePosicion == this._carreraActual.length) {
      this._carreraTerminada = true;
      return true;
    }

    if (this.siguientePosicion > this._carreraActual.length) {
      return false;
    }

    if (this._carreraActual[this.siguientePosicion] !== caracter) {
      return false;
    }

    this.siguientePosicion++;
    return true;
  }


  //aqui es una leccion random
  public recuperarLeccion(): string {
    this._carreraActual = "Soy un texto generado por Inteligencia Artificial.No devolver manzanas cuando hay peras.";
    return this._carreraActual;
  }


  get EsCarreraTerminada(): boolean {
    return this._carreraTerminada;
  }
}