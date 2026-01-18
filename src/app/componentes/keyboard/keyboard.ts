import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FluidModule } from 'primeng/fluid';
import { ServicioTexto } from '../../services/servicio-texto';

@Component({
  selector: 'app-keyboard',
  imports: [
    InputTextModule,
    FormsModule,
    FluidModule],
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.less',
})
export class Keyboard {

  _servicio: ServicioTexto;
  value = "";
  lastKeyPressed = '';
  esValido: boolean | null = null;
  keyHistory: string[] = [];

  // Contadores de teclas especiales
  enterCount = 0;
  escapeCount = 0;
  tabCount = 0;



  constructor(servicioTexto: ServicioTexto) {
    this._servicio = servicioTexto;
  }

  // 1. Método básico para keydown
  onKeyDown(event: KeyboardEvent) {
    // console.log('KeyDown:', {
    //   key: event.key,
    //   code: event.code,
    //   ctrlKey: event.ctrlKey,
    //   shiftKey: event.shiftKey,
    //   altKey: event.altKey
    // });

    this.lastKeyPressed = event.key;
    this.keyHistory.push(event.key);

    // console.log("lastKeyPressed:",this.lastKeyPressed);

    // Limitar historial a 10 teclas
    if (this.keyHistory.length > 10) {
      this.keyHistory.shift();
    }

    // Combinaciones de teclas comunes
    if (event.ctrlKey && event.key === 'c') {
      // this.showMessage('success', 'Copiado al portapapeles');
      // console.log('kopiado');
    }

    if (event.ctrlKey && event.key === 'v') {
      // this.showMessage('info', 'Pegado desde portapapeles');
      // console.log('pegado');
    }

    // Prevenir comportamiento por defecto para algunas teclas
    if (event.key === 'Tab') {
      this.tabCount++;
      // event.preventDefault(); // Descomenta si quieres evitar el tab
    }


    this.esValido = this._servicio.esTextoValido(event.key);
  }


  // 2. Método para keyup
  onKeyUp(event: KeyboardEvent) {
    // console.log('KeyUp:', event.key);

    // Contar teclas especiales
    switch (event.key) {
      case 'Enter':
        this.enterCount++;
        this.onEnterKey();
        break;
      case 'Escape':
        this.escapeCount++;
        this.onEscapeKey();
        break;
    }
  }

  // 3. Método para keypress (deprecated en algunos casos, pero aún usable)
  onKeyPress(event: KeyboardEvent) {
    // keypress solo para teclas que producen caracteres
    // console.log('KeyPress - Carácter:', event.key);

    // Validar entrada
    // if (!this.isValidCharacter(event.key)) {
    //   event.preventDefault();       
    // }
  }

  // 4. Métodos específicos para teclas
  onEnterKey() {
    // console.log('Enter presionado', this.enterCount, 'veces');
    // this.showMessage('success', `Formulario enviado (Enter #${this.enterCount})`);

    // Lógica cuando se presiona Enter
    // this.submitForm();
  }

  onEscapeKey() {
    // console.log('Escape presionado', this.escapeCount, 'veces');
    this.value = ''; // Limpiar input
    // this.showMessage('info', 'Campo limpiado (Escape)');
  }

  // 5. Métodos de utilidad
  private isValidCharacter(char: string): boolean {
    // Solo letras, números y espacios
    return /^[a-zA-Z0-9\s]$/.test(char);
  }

  clearHistory() {
    this.keyHistory = [];
    this.enterCount = 0;
    this.escapeCount = 0;
    this.tabCount = 0;
  }


  getInputClasses(): string {
    if (this.esValido === null) {
      return 'text-mono';
    }
    return this.esValido ? 'text-green-mono bordered' : 'text-red-mono bordered';
  }
}