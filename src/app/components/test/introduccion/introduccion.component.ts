import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-introduccion',
  templateUrl: './introduccion.component.html',
  styleUrls: ['./introduccion.component.scss'],
})
export class IntroduccionComponent implements OnInit {

  constructor(private screenOrientation: ScreenOrientation) { }

  ngOnInit() {
    // Se debe verificar que la persona este logeada y no haya hecho el test aun para poder ver esta pagina

   // console.log(this.screenOrientation.type);
   // console.log(this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE));
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }


}
