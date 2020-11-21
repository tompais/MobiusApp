import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-dibujo',
  templateUrl: './dibujo.component.html',
  styleUrls: ['./dibujo.component.scss'],
})
export class DibujoComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  imgbase64: string;

  // tslint:disable-next-line: ban-types
  private signaturePadOptions: Object = {
    maxWidth: 2,
    minWidth: 2,
    canvasWidth: 450,
    canvasHeight: 450,
  };

  constructor() { }

  ngOnInit() {}

  drawStart(){
    console.log('DRAW START');
  }

  drawComplete(){

    console.log('DRAW COMPLETE');
    this.imgbase64 = this.signaturePad.toDataURL();
    console.log(this.imgbase64);
  }

  reset(){
    this.signaturePad.clear();
  }
}
