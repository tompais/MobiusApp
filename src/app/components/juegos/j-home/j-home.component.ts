import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';

@Component({
  selector: 'app-j-home',
  templateUrl: './j-home.component.html',
  styleUrls: ['./j-home.component.scss'],
})
export class JHomeComponent implements OnInit {

  categoriaRecomendada: string[] = [];
  categoriaRecomendadaTraducida: string[] = [];
  categorias: string[] = [];
  categoriasTraducidas: string[] = [];

  constructor(public route:ActivatedRoute, public commonService: CommonService, private router: Router, public juegosServ: JuegosService, public http: HttpClient) { 
    route.params.subscribe(val => {
      this.obtenerDatosHome();    });
  }

  ngOnInit() {
    
  }

  obtenerDatosHome(){

    this.juegosServ.traerDatosHome().subscribe((resp: any) => {
      this.categoriaRecomendada[0] = resp.recommendedCategory;
      this.categorias = resp.categories;

      this.categoriaRecomendadaTraducida = this.traducirCategorias(this.categoriaRecomendada);
      this.categoriasTraducidas = this.traducirCategorias(this.categorias);

    });
  }

  traducirCategorias(cat: string[]){
    const catTrad: string[] = [];

    for (let i = 0; i < cat.length; i++) {
      console.log('nombre');
      console.log(cat[i]);

      if (cat[i] === 'attention'){
        catTrad[i] = 'atencion';
      }
      if (cat[i] === 'calculation'){
        catTrad[i] = 'calculo';
      }
      if (cat[i] === 'drawing'){
        catTrad[i] = 'dibujo';
      }
      if (cat[i] === 'writing'){
        catTrad[i] = 'escritura';
      }
      if (cat[i] === 'fixation'){
        catTrad[i] = 'fijacion';
      }
      if (cat[i] === 'reading'){
        catTrad[i] = 'lectura';
      }
      if (cat[i] === 'comprehension'){
        catTrad[i] = 'ordenes';
      }
      if (cat[i] === 'visualization'){
        catTrad[i] = 'visualizacion';
      }
    }

    return catTrad;
  }
}
