import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CommonService } from './services/common/common.service';
import { RegistroComponent } from './components/commons/registro/registro.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HomeComponent } from './components/shared/home/home.component';
import { LoginComponent } from './components/commons/login/login.component';
import { EmailConfirmationComponent } from './components/commons/email-confirmation/email-confirmation.component';
import { AtencionCalculoComponent } from './components/test/atencion-calculo/atencion-calculo.component';
import { IntroduccionComponent } from './components/test/introduccion/introduccion.component';
import { InfoConsultaServiceComponent } from './components/commons/info-consulta-service/info-consulta-service.component';
import { InfoConsultaServiceGrupoComponent } from './components/commons/info-consulta-service-grupo/info-consulta-service-grupo.component';
import { OlvidoPasswordComponent } from './components/commons/olvido-password/olvido-password.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, RegistroComponent, LoginComponent, IntroduccionComponent,
    EmailConfirmationComponent, AtencionCalculoComponent, InfoConsultaServiceComponent, InfoConsultaServiceGrupoComponent, OlvidoPasswordComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
