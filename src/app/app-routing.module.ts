import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
  {path: 'test/atencion', component: AtencionComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
