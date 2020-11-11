import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { StorageSession } from 'src/app/components/commons/models/commons/StorageSession';
import { ErrorServicio } from 'src/app/components/commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from 'src/app/components/commons/models/errors/ErrorServicioGrupo';
import { GameCategoryResponse } from 'src/app/components/commons/models/commons/GameCategoryResponse';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { FijacionService } from 'src/app/services/test/fijacion.service';
import { Resources } from '../../commons/models/commons/Resources';
import { AppComponent } from 'src/app/app.component';
import { Tasks } from '../../commons/models/commons/Tasks';
import { Inputs } from '../../commons/models/commons/Inputs';
import { Answer } from '../../commons/models/commons/Answer';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-fijacion',
  templateUrl: './fijacion.component.html',
  styleUrls: ['./fijacion.component.scss'],
})
export class FijacionComponent implements OnInit {

  texto = '';
  audio: any;
  puedeEnviar = false;
  reproduirAudio = false;
  storageSession: StorageSession = null;
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
  fijacionRquest: GameCategoryRequest = null;
  algo = '';
  constructor(public app: AppComponent, private sr: SpeechRecognition, private fj: FijacionService, public router: Router) {
    this.primaryApp = app;
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
    this.fijacionRquest = new GameCategoryRequest();
    this.fijacionRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
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

    this.fj.getFijacion().subscribe((resp: any) => {

      this.repuesta.id = resp.id;
      this.repuesta.name = resp.name;
      this.repuesta.description = resp.description;
      this.repuesta.category = resp.category;

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
      this.audio = new Audio('https://stage-blue-mobius-mind-api.herokuapp.com/' + this.repuesta.resources[0].fileName);

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
        this.texto = matches[0];
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
    this.fijacionRquest.gameId = this.repuesta.id;
    this.fijacionRquest.category = this.repuesta.category;
    // this.fijacionRquest.patientTaskAnswersList.taskId = this.repuesta.taskId[0].id;
    const task: PatientTaskAnswersRequestList<string> = new PatientTaskAnswersRequestList<string>();
    task.taskId = this.repuesta.tasks[0].id;
    task.patientAnswersRequest = new Array<string>();

    if (this.texto.length > 0){
        const textoSeparado: string[] = this.texto.split(' ');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < textoSeparado.length; i++){
          task.patientAnswersRequest[i] = textoSeparado[i].trim();
        }
       // console.log(textoSeparado);
        // console.log(this.fijacionRquest);
       // console.log(task);
    }

    this.fijacionRquest.patientTaskAnswersRequestList.push(task);

    JSON.stringify(this.fijacionRquest);

    this.algo = JSON.stringify(this.fijacionRquest);
    console.log(JSON.stringify(this.fijacionRquest));
    // console.log(JSON.stringify(this.fijacionRquest));
    this.fj.setFijacion(this.fijacionRquest).subscribe((resp: any) => {
      this.errorCode = false;
      if (this.errorCode === false) {
            this.router.navigate(['/test/calculo']);
      }
    },
    (error: HttpErrorResponse) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
      this.error = error.message;
    });
    this.fijacionRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestList<string>>();
  }

  skipForm(){
    this.router.navigate(['/test/calculo']);
  }

}
