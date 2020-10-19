import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmailConfirmationComponent } from './components/commons/email-confirmation/email-confirmation.component';
import { HomeComponent } from './components/shared/home/home.component';
import { AtencionCalculoComponent } from './components/test/atencion-calculo/atencion-calculo.component';
import { IntroduccionComponent } from './components/test/introduccion/introduccion.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'email-confirmation',
    component: EmailConfirmationComponent
  },
  {
    path: 'test/introduccion',
    component: IntroduccionComponent
  },
  {
    path: 'test/atencion-calculo',
    component: AtencionCalculoComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
