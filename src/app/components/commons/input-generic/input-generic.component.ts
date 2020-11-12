import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { TipoEntradaDato } from '../enums/TipoEntradaDatos';
import { TipoInput } from '../enums/TipoInput';
import { Inputs } from '../models/commons/Inputs';
import { Tasks } from '../models/commons/Tasks';
import { TextoConvertido } from '../models/commons/textoConvertido';
import { Resources } from '../models/commons/Resources';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-input-generic',
  templateUrl: './input-generic.component.html',
  styleUrls: ['./input-generic.component.scss'],
})
export class InputGenericComponent implements OnInit {

  // Tipo por defecto un textbox
  @Input() tipo: TipoInput;
  // Tipo de dato del input por defecto alfanumerico
  @Input() tipoDato: TipoEntradaDato;
  // valor del input
  @Input() valor: any;
  // tipo de boton que se va a usar, submit, para escuchar, para hablar
  @Input() tipoBoton: string;
  // atributo name para los input
  @Input() name: string;
  // nombre del icono de ionic para los botones
  @Input() icono: string;
  // propiedad ngmodel del input
  @Input() modelBinding: string;
  // maxima cantidad de caractres
  @Input() longitudMaxima: number;
  // minima cantidad de caracteres
  @Input() longitudMinima: number;
  // lista de tareas del input
  @Input() tareas: Tasks[];
  // lista de inputs
  @Input() inputs: Inputs[];
  // nombre de la categoria
  @Input() nombreCategoria: string;
  // para indicar si es o no deshabilitado
  @Input() deshabilitado: boolean;
  // el objeto audio para poder darle play al audio
  @Input() audio: any;
  // es el objeto speech recognition enviado desde el componente
  @Input() speech: any;
  // recurso que se pasa, ya sea audio, imagen, etc
  @Input() recurso: Resources;
  // ancho de resolucion sin pixeles
  @Input() ancho: string;
  // alto de resolucion sin pixeles
  @Input() alto: string;
  // indica si se requere o no que se escriba en el input
  @Input() requerido: boolean;
  // listado para los select
  @Input() listado: any[];
  // indica el nombre del label
  @Input() label: string;
  // indica si es solo label
  @Input() soloLabel: boolean;
  // texto para boton
  @Input() textoBoton: string;
  @Input() formulario: NgForm;

  // emitter para enviar al componente el texto convertido
  @Output() enviarTexto = new EventEmitter<TextoConvertido>();
  // emiiter para enviar repuestas de inputs
  @Output() resp = new EventEmitter<object>();
  textoConvertido: TextoConvertido;
  pathServidor = 'https://stage-blue-mobius-mind-api.herokuapp.com/';

  repuestas: any[] = new Array<any>();

  constructor() {
    this.tipo = TipoInput.textBox;
    this.tipoDato = TipoEntradaDato.alfaNumerico;
    this.valor = '';
    this.modelBinding = '';
    this.longitudMaxima = 10;
    this.longitudMinima = 0;
    this.tareas = new Array<Tasks>();
    this.inputs = new Array<Inputs>();
    this.nombreCategoria = '';
    this.deshabilitado = false;
    this.textoConvertido = new TextoConvertido();
    this.tipoBoton = '';
    this.ancho = '200';
    this.alto = '200';
    this.name = '';
    this.icono = '';
    this.label = '';
    this.requerido = false;
  }

  ngOnInit() {

  }

  // solo para reproducir audio
  escuchar(){
    this.audio.play();
  }

  // funcion para poder hablar por microfono
  hablar(){
    this.speech.startListening()
    .subscribe(
      (matches: string[]) => {
        this.textoConvertido.texto = matches[0];
        this.textoConvertido.puedeEnviar = true;
        this.enviarTexto.emit(this.textoConvertido);
      },
      (onerror) => console.log('error:', onerror)
    );
  }

  public enviarRepuesta(){
    this.resp.emit(this.repuestas);
  }

}
