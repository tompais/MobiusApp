import { Component, OnInit } from '@angular/core';
import { Img } from '../../commons/models/Img';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  img: Img[];

  constructor() { }

  ngOnInit() {
    this.img = new Array<Img>();
    const img: Img = new Img();
    img.src = '/assets/img/logo.png';
    img.text = 'Mobius Mind';
    this.img.push(img);
  }

  msj() {
    console.log('HOLA');
  }

}
