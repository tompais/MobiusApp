import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ErrorServicio } from 'src/app/components/commons/models/errors/ErrorServicio';
import { ErrorServicioGrupo } from 'src/app/components/commons/models/errors/ErrorServicioGrupo';
import { GameCategoryResponse } from 'src/app/components/commons/models/commons/GameCategoryResponse';
import { GameCategoryRequest } from 'src/app/components/commons/models/commons/GameCategoryRequest';
import { Resources } from '../../commons/models/commons/Resources';
import { AppComponent } from 'src/app/app.component';
import { Tasks } from '../../commons/models/commons/Tasks';
import { Inputs } from '../../commons/models/commons/Inputs';
import { PatientTaskAnswersRequestList } from '../../commons/models/commons/PatientTaskAnswersRequestList';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../../services/common/localstorage.service';
import { environmentDevStageBlue } from '../../../../environments/environment.dev.stage.blue';
import { environmentProd } from '../../../../environments/environment.prod';
import { MemoriaService } from '../../../services/test/memoria.service';
import { PatientTaskAnswersRequestListConResult } from '../../commons/models/commons/PatientTaskAnswerRequesListConResult';
import { PatientAnswersRequest } from '../../commons/models/commons/PatientAnswersRequest';
import { GameCategoryRequestConResult } from '../../commons/models/commons/GameCategoryRequestConResult';

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {

  texto = '';
  textoGuardado = '';
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
  MemoriaRquest: GameCategoryRequestConResult = null;
  algo = '';
  storage: LocalStorageService;
  idUsuario: any;

  constructor(public app: AppComponent, private sr: SpeechRecognition, private memo: MemoriaService, public router: Router) {
    this.primaryApp = app;
    this.storage = new LocalStorageService();
  }

  ngOnInit() {
    this.repuesta = new GameCategoryResponse();
    this.erroresServicio = new ErrorServicioGrupo();
    this.erroresServicio.errores.push(new ErrorServicio('getMemoria', true, '', false, 'getMemoria'));
    this.errorresServicioSet = new ErrorServicioGrupo();
    this.errorresServicioSet.errores.push(new ErrorServicio('getMemoria', true, '', false, 'getMemoria'));
    this.task = new Tasks();
    this.input = new Inputs();
    this.resource = new Resources();
    this.MemoriaRquest = new GameCategoryRequestConResult();
    this.MemoriaRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestListConResult<string>>();
    this.getMemoria();
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

  getMemoria(){
    // console.log('la tenes adentro');
     const errorSrv = this.erroresServicio.obtenerErrorServicio('getMemoria');
     errorSrv.nuevoRequest();

     this.memo.getMemoria().subscribe((resp: any) => {
       this.repuesta = resp;
       // llamamos del local storage el texto con la respuesta correcta
       this.idUsuario =  this.storage.get('id');
       this.textoGuardado = this.storage.get(this.idUsuario + 'palabrasCorrectas');

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

   setMemoria(){
    const errorSrv = this.errorresServicioSet.obtenerErrorServicio('setMemoria');
    errorSrv.nuevoRequest();
    this.MemoriaRquest.gameId = this.repuesta.id;
    this.MemoriaRquest.category = this.repuesta.category;
    const task: PatientTaskAnswersRequestListConResult<string> = new PatientTaskAnswersRequestListConResult<string>();
    task.taskId = this.repuesta.tasks[0].id;
    task.patientAnswersRequest = new Array<PatientAnswersRequest<string>>();
    if (this.texto.length > 0){
        const textoSeparado: string[] = this.texto.split(' ');
        const textoGuardadoSeparado: string[] = this.textoGuardado.split('-');
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < textoSeparado.length; i++){
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < textoGuardadoSeparado.length; j++){
              task.patientAnswersRequest[i] = new PatientAnswersRequest();

              if (textoSeparado[i].toUpperCase().trim() === textoGuardadoSeparado[j].toUpperCase().trim()) {
                task.patientAnswersRequest[i].isCorrect = true;
                break;
              }else{
                task.patientAnswersRequest[i].isCorrect = false;
              }
          }
          task.patientAnswersRequest[i].answer = textoSeparado[i].toUpperCase().trim();
        }
    }

    console.log('REPUESTA');
    console.log(task);

    this.MemoriaRquest.patientTaskAnswersRequestList.push(task);

    JSON.stringify(this.MemoriaRquest);

    this.algo = JSON.stringify(this.MemoriaRquest);
    console.log(JSON.stringify(this.MemoriaRquest));

    this.memo.setMemoria(this.MemoriaRquest).subscribe((resp: any) => {
      this.errorCode = false;
      if (this.errorCode === false) {
            this.router.navigate(['/test/visualizacion']);
      }
    },
    (error: HttpErrorResponse) => {
      errorSrv.getError(error);
      this.cargando = false;
      this.errorCode = true;
      this.error = error.message;
    });
    this.MemoriaRquest.patientTaskAnswersRequestList = new Array<PatientTaskAnswersRequestListConResult<string>>();
  }

}
