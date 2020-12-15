import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './components/shared/home/home.component';
import { LoginComponent} from './components/commons/login/login.component';
import { RegistroComponent} from './components/commons/registro/registro.component';
import { EmailConfirmationComponent } from './components/commons/email-confirmation/email-confirmation.component';
import { TestOrientacionComponent } from './components/test/test-orientacion/test-orientacion.component';
import { IntroduccionComponent } from './components/test/introduccion/introduccion.component';
import { CalculoComponent } from './components/test/calculo/calculo.component';
import { OlvidoPasswordComponent } from './components/commons/olvido-password/olvido-password.component';
import { FijacionComponent } from './components/test/fijacion/fijacion.component';
import { CommonModule } from '@angular/common';
import { VisualizacionComponent } from './components/test/visualizacion/visualizacion.component';
import { OrdenesComponent } from './components/test/ordenes/ordenes.component';
import { FinalizacionComponent } from './components/test/finalizacion/finalizacion.component';
import { AtencionComponent } from './components/test/atencion/atencion.component';
import { EscrituraComponent } from './components/test/escritura/escritura.component';
import { LecturaComponent } from './components/test/lectura/lectura.component';
import { MemoriaComponent } from './components/test/memoria/memoria.component';
import { RepeticionComponent } from './components/test/repeticion/repeticion.component';
import { DibujoComponent } from './components/test/dibujo/dibujo.component';
import { JDibujoComponent } from './components/juegos/j-dibujo/j-dibujo.component';
import { JEscrituraComponent } from './components/juegos/j-escritura/j-escritura.component';
import { JOrdenesComponent } from './components/juegos/j-ordenes/j-ordenes.component';
import { JHomeComponent } from './components/juegos/j-home/j-home.component';
import { JFinalizacionComponent } from './components/juegos/j-finalizacion/j-finalizacion.component';
import { JAtencionComponent } from './components/juegos/j-atencion/j-atencion.component';
import { JCalculoComponent } from './components/juegos/j-calculo/j-calculo.component';
import { JFijacionComponent } from './components/juegos/j-fijacion/j-fijacion.component';
import { JLecturaComponent } from './components/juegos/j-lectura/j-lectura.component';
import { JVisualizacionComponent } from './components/juegos/j-visualizacion/j-visualizacion.component';
import { JRepeticionComponent } from './components/juegos/j-repeticion/j-repeticion.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'principal' // path: '',
    // component: AppComponent
  },
  {path: 'principal', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistroComponent},
  {path: 'email-confirmation', component: EmailConfirmationComponent},
  {path: 'test/introduccion', component: IntroduccionComponent},
  {path: 'test/calculo', component: CalculoComponent},
  {path: 'login/olvidoPassword', component: OlvidoPasswordComponent},
  {path: 'test/orientacion', component: TestOrientacionComponent},
  {path: 'test/fijacion', component: FijacionComponent},
  {path: 'test/visualizacion', component: VisualizacionComponent},
  {path: 'test/ordenes', component: OrdenesComponent},
  {path: 'test/finalizacion', component: FinalizacionComponent},
  {path: 'test/atencion', component: AtencionComponent},
  {path: 'test/escritura', component: EscrituraComponent},
  {path: 'test/lectura', component: LecturaComponent},
  {path: 'test/memoria', component: MemoriaComponent},
  {path: 'test/repeticion', component: RepeticionComponent},
  {path: 'test/dibujo', component: DibujoComponent},
  {path: 'juegos/atencion', component: JAtencionComponent},
  {path: 'juegos/calculo', component: JCalculoComponent},
  {path: 'juegos/dibujo', component: JDibujoComponent},
  {path: 'juegos/escritura', component: JEscrituraComponent},
  {path: 'juegos/fijacion', component: JFijacionComponent},
  {path: 'juegos/lectura', component: JLecturaComponent},
  {path: 'juegos/ordenes', component: JOrdenesComponent},
  {path: 'juegos/visualizacion', component: JVisualizacionComponent},
  {path: 'juegos/home', component: JHomeComponent},
  {path: 'juegos/finalizacion', component: JFinalizacionComponent},
  {path: 'juegos/repeticion', component: JRepeticionComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
