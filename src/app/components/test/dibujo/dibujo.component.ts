import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SignaturePad } from 'angular2-signaturepad';
import { Observable, Observer } from 'rxjs';
import { DibujoService } from 'src/app/services/test/dibujo.service';
import { environmentDevStageBlue } from 'src/environments/environment.dev.stage.blue';
import { environmentProd } from 'src/environments/environment.prod';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { DemoImage } from './DemoImage';

@Component({
  selector: 'app-dibujo',
  templateUrl: './dibujo.component.html',
  styleUrls: ['./dibujo.component.scss'],
})
export class DibujoComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  imgbase64: string;
  imagenStatus: boolean;
  imagenStatus2: boolean;
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;
  imagen: File;
  nombreArchivo: string[] = [];
  cargando = false;
  errorCode = false;
  dibujoRequest: GameCategoryRequest = null;
  gameId: number;
  category: string;
  taskId: number;
  descripcionTask: string;
  url = environmentProd.url;
  img = 'images/';
  imgName: string;
  nameTest: string;
  descripcionTest: string;
  imagenUrl: string;
  base64Solo: string[] = [];

  // tslint:disable-next-line: ban-types
  private signaturePadOptions: Object = {
    maxWidth: 8,
    minWidth: 8,
    canvasWidth: 400,
    canvasHeight: 400,
    backgroundColor: 'rgb(255, 255, 255)',
  };

  constructor(private router: Router, private domSanitizer: DomSanitizer, private demoImage: DemoImage, private dibujoServ: DibujoService) {
    this.windowOPen = false;
   }

  ngOnInit() {
    // Dummy Sample image of how it will work
    this.imagenStatus = true;
    this.imagenStatus2 = false;
    this.obtenerDatos();
    this.getImageWithoutWindowOpen(this.demoImage.imageBase64Url);
  }

  drawStart(){
    console.log('DRAW START');
  }

  drawComplete(){
    console.log('DRAW COMPLETE');
    this.imgbase64 = this.signaturePad.toDataURL();

    this.base64Solo[0] = this.imgbase64.substring(22);
    // PRUEBA


    const dataURL = this.signaturePad.toDataURL('image/png');
    /*const data = atob(dataURL.substring('data:image/png;base64,'.length)),asArray = new Uint8Array(data.length);
    console.log('DATA: ' + data);
    for (var i = 0, len = data.length; i < len; ++i) {
      asArray[i] = data.charCodeAt(i);
    }
    const blob = new Blob([asArray], { type: 'image/png' });
    console.log('BLOB: ' + blob);
    console.log(blob);*/
    const imageBase64 = this.imgbase64;
    // const blob = this.dataURItoBlob(imageBase64);
    // var image = new File([blob], 'image.png');
    // const image: File = new File([blob], 'dibujo.png');
    // var source = 'https://www.google.es/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png';
    /*var source = image.name;
    var a = document.createElement('a');
    a.download = 'true';
    a.target = '_blank';
    a.href = source;
    a.click();*/
    // console.log('IMG: ' + image.type);
    // console.log(this.imgbase64);
    /*const filename = 'imagen';
    const extension = '.png';
    const objectURL = URL.createObjectURL(this.convertDataUrlToBlob(imageBase64));
    console.log('IMG: ');
    console.log(objectURL);
    const file = new File([this.convertDataUrlToBlob(imageBase64)], filename, {type: `image/${extension}`});
    console.log('FILE: ');
    console.log(file);
    const a = document.createElement('a');
    a.download = 'IMAGEN';
    a.target = '_blank';
    a.href = file.name;
    a.click();*/
  }

  sanatizeUrl(generatedImageUrl): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(generatedImageUrl);
  }

  /* Method to fetch image from Url */
  getBase64ImageFromURL(url: string): Observable<string> {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      img.width = 400;
      img.height = 400;
      img.className = 'color:red';
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  finalizar(imageUrl?: string) {
    imageUrl = this.imgbase64;
    this.enviarDatos();
    /*this.windowOPen = true;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });*/
  }

  getImageWithoutWindowOpen(imageUrl: string) {
    this.windowOPen = false;
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.base64TrimmedURL = base64Data;
      this.createBlobImageFileAndShow();
    });
  }

  /** Method that will create Blob and show in new window */
  createBlobImageFileAndShow(): void {
    this.dataURItoBlob(this.base64TrimmedURL).subscribe((blob: Blob) => {
      const imageBlob: Blob = blob;
      const imageName: string = this.generateName();
      /*const imageFile: File = new File([imageBlob], imageName, {
        type: 'image/jpeg'
      });*/
      const imageFile: File = new File([imageBlob], imageName, {
        type: 'image/png'
      });
      console.log(imageFile);
      this.generatedImage = window.URL.createObjectURL(imageFile);
      console.log(this.generatedImage);
      this.imagen = imageFile;
      // ENVIAR imageFile
      // on demo image not open window
      /*if (this.windowOPen) {
        window.open(this.generatedImage);
      }*/
      this.enviarImg();
    });

  }

  /** Method to Generate a Name for the Image */
  generateName(): string {
    const date: number = new Date().valueOf();
    let text = '';
    const possibleText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    // Replace extension according to your media type like this
    // return date + '.' + text + '.jpeg';
    return date + '.' + text + '.png';
  }

  /* Method to convert Base64Data Url as Image Blob */
  dataURItoBlob(dataURI: string): Observable<Blob> {
    // tslint:disable-next-line: deprecation
    return Observable.create((observer: Observer<Blob>) => {
      const byteString: string = window.atob(dataURI);
      const arrayBuffer: ArrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array: Uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      // const blob = new Blob([int8Array], { type: 'image/jpeg' });
      const blob = new Blob([int8Array], { type: 'image/png' });
      observer.next(blob);
      observer.complete();
    });
  }

  convertDataUrlToBlob(dataUrl): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
}

  /* Method to create base64Data Url from fetched image */
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    console.log('CANVAS');
    console.log(canvas.width);
    console.log(canvas.height);
    console.log(canvas);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    console.log('CTX');
    console.log(ctx);
    ctx.fillStyle = 'white';
    ctx.shadowColor = 'red';
    ctx.imageSmoothingQuality = 'high';
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = 'red';
    ctx.direction = 'inherit';
    // This will draw image
    // ctx.drawImage(img, 0, 0);
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    // const dataURL: string = canvas.toDataURL('image/png');
    const dataURL: string = canvas.toDataURL('image/png');
    this.base64DefaultURL = dataURL;
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  /*getBase64Image(base64String: string) {
    return base64String.replace('/^data:image/(png|jpg);base64,/', '');
  }*/

  /*dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.toString().split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {type: 'image/png'}); // or mimeString if you want
    return blob;
    }
    console.log('DRAW COMPLETE');
    this.imgbase64 = this.signaturePad.toDataURL();
    console.log(this.imgbase64);
  }*/

  reset(){
    this.signaturePad.clear();
  }

  enviarDatos(){
    console.log(this.dibujoRequest);
    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.patientAnswersRequest = this.base64Solo;
    task.taskId = this.taskId;
    // task.patientAnswersRequest = this.nombreArchivo;
    this.dibujoRequest.patientTaskAnswersRequestList.push(task);
    console.log(this.dibujoRequest);

    this.dibujoServ.enviarDatos(this.dibujoRequest).subscribe((resp: any) => {
      this.cargando = false;
      this.errorCode = false;
      if (this.errorCode === false) {
        this.router.navigate(['/test/finalizacion']);
      }
    }, (error: HttpErrorResponse) => {
      this.cargando = false;
      this.errorCode = true;
    });
  }

  obtenerDatos(){

    this.dibujoRequest = new GameCategoryRequest();
    this.dibujoRequest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
    console.log(this.url);
    this.dibujoServ.traerDatos().subscribe((resp: any) => {

      this.descripcionTask = resp.tasks[0].description;
      this.nameTest = resp.name;
      this.imgName = resp.resources[0].fileName;

      this.descripcionTest = resp.description;
      this.dibujoRequest.gameId = resp.id;
      this.dibujoRequest.category = resp.category;
      this.dibujoRequest.areTestGameAnswers = resp.isTestGame;

      this.taskId = resp.tasks[0].id;

      this.imagenUrl = `${this.url}/${this.img}${this.imgName}`;
      console.log(this.imagen);
      });
}

enviarImg(){
  this.dibujoServ.enviarImagen(this.imagen).subscribe((resp: any) => {
    this.nombreArchivo[0] = resp.fileName;
    console.log(resp);
    console.log(this.nombreArchivo);

    this.enviarDatos();
  });
}

ocultarImg(){
this.imagenStatus = false;
this.imagenStatus2 = true;

}

mostrarImg(){
  this.imagenStatus = true;
  this.imagenStatus2 = false;
}

}
