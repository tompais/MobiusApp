import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './components/shared/home/home.component';
import { LoginComponent} from './components/commons/login/login.component';
import { RegistroComponent} from './components/commons/registro/registro.component';
import { EmailConfirmationComponent } from './components/commons/email-confirmation/email-confirmation.component';
import { TestOrientacionComponent } from './components/test/test-orientacion/test-orientacion.component';
import { IntroduccionComponent } from './components/test/introduccion/introduccion.component';
import { AtencionCalculoComponent } from './components/test/atencion-calculo/atencion-calculo.component';
import { OlvidoPasswordComponent } from './components/commons/olvido-password/olvido-password.component';
import { VisualizacionComponent } from './components/test/visualizacion/visualizacion.component';
import { OrdenesComponent } from './components/test/ordenes/ordenes.component';

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
  {path: 'test/atencion-calculo', component: AtencionCalculoComponent},
  {path: 'login/olvidoPassword', component: OlvidoPasswordComponent},
  {path: 'test/orientacion', component: TestOrientacionComponent},
  {path: 'test/visualizacion', component: VisualizacionComponent},
  {path: 'test/ordenes', component: OrdenesComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
