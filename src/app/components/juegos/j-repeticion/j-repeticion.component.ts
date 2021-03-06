import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LocalStorageService } from 'src/app/services/common/localstorage.service';
import { JuegosService } from 'src/app/services/juegos/juegos.service';
import { GameCategoryRequest } from '../../commons/models/commons/GameCategoryRequest';
import { GameCategoryResponse } from '../../commons/models/commons/GameCategoryResponse';
import { Inputs } from '../../commons/models/commons/Inputs';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Resources } from '../../commons/models/commons/Resources';
import { Tasks } from '../../commons/models/commons/Tasks';
import { ErrorServicio } from '../../commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from '../../commons/models/errors/ErrorServicioGrupo';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { environmentProd } from 'src/environments/environment.prod';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-j-repeticion',
  templateUrl: './j-repeticion.component.html',
  styleUrls: ['./j-repeticion.component.scss'],
})
export class JRepeticionComponent implements OnInit {
// texto = '';
texto: string[] = [];
audio: any;
puedeEnviar = false;
reproduirAudio = false;
erroresServicio: ErrorServicioGrupo = null;
errorresServicioSet: ErrorServicioGrupo = null;
repuesta: GameCategoryResponse = null;
error = '';
errorCode = false;
cargando = false;
primaryApp: AppComponent = null;
task: Tasks = null;
input: Inputs = null;
resource: Resources = null;
repeticionRquest: GameCategoryRequest = null;
algo = '';
storage: LocalStorageService;
idUsuario: any;

constructor(public app: AppComponent, private sr: SpeechRecognition, private juegosServ: JuegosService, public router: Router) {
  this.primaryApp = app;
  this.storage = new LocalStorageService();
}

ngOnInit(){
  this.repuesta = new GameCategoryResponse();
  this.erroresServicio = new ErrorServicioGrupo();
  this.erroresServicio.errores.push(new ErrorServicio('getFijacion', true, '', false, 'getFijacion'));
  this.errorresServicioSet = new ErrorServicioGrupo();
  this.errorresServicioSet.errores.push(new ErrorServicio('setFijacion', true, '', false, 'setFijacion'));
  this.task = new Tasks();
  this.input = new Inputs();
  this.resource = new Resources();
  this.repeticionRquest = new GameCategoryRequest();
  this.repeticionRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
  this.getFijacion();
  this.sr.hasPermission()
  .then((hasPermission: boolean) => {
    if (!hasPermission){
      this.sr.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      );
    }
  });
}

getFijacion(){
 // console.log('la tenes adentro');
  const errorSrv = this.erroresServicio.obtenerErrorServicio('getFijacion');
  errorSrv.nuevoRequest();

  this.juegosServ.traerDatos('repetition').subscribe((resp: any) => {

    this.repuesta.id = resp.id;
    this.repuesta.name = resp.name;
    this.repuesta.description = resp.description;
    this.repuesta.category = resp.category;
    this.repuesta.isTestGame = resp.isTestGame;

    this.repuesta.tasks = new Array<Tasks>();
    this.task.id = resp.tasks[0].id;
    this.task.description = resp.tasks[0].description;
    this.repuesta.tasks.push(this.task);

    this.input.id = resp.tasks[0].inputs[0].id;
    this.input.type = resp.tasks[0].inputs[0].type;
    this.repuesta.tasks[0].inputs = new Array<Inputs>();
    this.repuesta.tasks[0].inputs.push(this.input);

    this.resource.id = resp.resources[0].id;
    this.resource.type = resp.resources[0].type;
    this.resource.fileName = resp.resources[0].fileName;
    this.repuesta.resources = new Array<Resources>();
    this.repuesta.resources.push(this.resource);

    // agregamos la url del audio
    this.audio = new Audio(environmentProd.url + '/audios/' + this.repuesta.resources[0].fileName);

    // guardamos en local storage el texto del file que es la repuesta correcta para luego utilizarlo en memoria
    this.idUsuario =  this.storage.get('id');
    this.storage.set(this.idUsuario + 'palabrasCorrectas', this.repuesta.resources[0].fileName.split('.')[0]);

     // tslint:disable-next-line: no-shadowed-variable
    /*errorSrv.procesarRespuesta(resp, (resp: any): void => {
    });*/
  },
    (error: HttpErrorResponse) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
      this.error = error.message;
    }
  );
}

hablar(){
    this.sr.startListening()
  .subscribe(
    (matches: string[]) => {
      this.texto[0] = matches[0];
      this.puedeEnviar = true;
    },
    (onerror) => console.log('error:', onerror)
  );
}

escuchar(){
  this.audio.play();
  this.reproduirAudio = true;
}

setFijacion(){
  const errorSrv = this.errorresServicioSet.obtenerErrorServicio('setFijacion');
  errorSrv.nuevoRequest();
  this.repeticionRquest.gameId = this.repuesta.id;
  this.repeticionRquest.category = this.repuesta.category;
  this.repeticionRquest.areTestGameAnswers = this.repuesta.isTestGame;
  // this.fijacionRquest.patientTaskAnswersList.taskId = this.repuesta.taskId[0].id;
  const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
  task.taskId = this.repuesta.tasks[0].id;
  task.patientAnswersRequest = this.texto;
  // task.patientAnswersRequest = new Array<string>();

  /*if (this.texto.length > 0){
      const textoSeparado: string[] = this.texto.split(' ');
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < textoSeparado.length; i++){
        task.patientAnswersRequest[i] = textoSeparado[i].trim();
      }
     // console.log(textoSeparado);
      // console.log(this.fijacionRquest);
     // console.log(task);
  }*/

  this.repeticionRquest.patientTaskAnswersRequestList.push(task);

  JSON.stringify(this.repeticionRquest);

  this.algo = JSON.stringify(this.repeticionRquest);
  console.log(JSON.stringify(this.repeticionRquest));
  // console.log(JSON.stringify(this.fijacionRquest));
  this.juegosServ.enviarDatos(this.repeticionRquest).subscribe((resp: any) => {
    this.errorCode = false;
    if (this.errorCode === false) {
          this.router.navigate(['/juegos/finalizacion']);
    }
  },
  (error: HttpErrorResponse) => {
    errorSrv.getError(error);
    this.cargando = false;
    this.errorCode = true;
    this.error = error.message;
  });
  this.repeticionRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
}

}
