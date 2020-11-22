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
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/shared/home/home.component';
import { LoginComponent } from './components/commons/login/login.component';
import { TestOrientacionComponent } from './components/test/test-orientacion/test-orientacion.component';
import { TextValidationComponent } from './components/commons/text-validation/text-validation.component';
import { IntroduccionComponent } from './components/test/introduccion/introduccion.component';
import { OlvidoPasswordComponent } from './components/commons/olvido-password/olvido-password.component';
import { EmailConfirmationComponent } from './components/commons/email-confirmation/email-confirmation.component';
import { CalculoComponent } from './components/test/calculo/calculo.component';
import { InfoConsultaServiceComponent } from './components/commons/info-consulta-service/info-consulta-service.component';
import { InfoConsultaServiceGrupoComponent } from './components/commons/info-consulta-service-grupo/info-consulta-service-grupo.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMapsComponent } from './components/commons/google-maps/google-maps.component';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { OrientacionService } from './services/test/orientacion.service';
import { FijacionService } from './services/test/fijacion.service';
import { AuthService } from './services/auth/auth.service';
import { FijacionComponent } from './components/test/fijacion/fijacion.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './components/commons/error/error.component';
import { OrdenesComponent } from './components/test/ordenes/ordenes.component';
import { VisualizacionComponent } from './components/test/visualizacion/visualizacion.component';
import { FinalizacionComponent } from './components/test/finalizacion/finalizacion.component';
import { InputGenericComponent } from './components/commons/input-generic/input-generic.component';
import { AtencionComponent } from './components/test/atencion/atencion.component';
import { EscrituraComponent } from './components/test/escritura/escritura.component';
import { LocationService } from './services/location.service';
import { LecturaComponent } from './components/test/lectura/lectura.component';
import { MemoriaComponent } from './components/test/memoria/memoria.component';
import { RepeticionComponent } from './components/test/repeticion/repeticion.component';
import { DibujoComponent } from './components/test/dibujo/dibujo.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { DemoImage } from './components/test/dibujo/DemoImage';

@NgModule({
  declarations: [AppComponent, HomeComponent, RegistroComponent, LoginComponent, TextValidationComponent, IntroduccionComponent,
    EmailConfirmationComponent, CalculoComponent, InfoConsultaServiceComponent, InfoConsultaServiceGrupoComponent, OlvidoPasswordComponent,
    TestOrientacionComponent, GoogleMapsComponent, FijacionComponent, ErrorComponent, OrdenesComponent, VisualizacionComponent,
    FinalizacionComponent, AtencionComponent, EscrituraComponent, LecturaComponent, InputGenericComponent, MemoriaComponent, RepeticionComponent, DibujoComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, CommonModule, SignaturePadModule],
  providers: [
    StatusBar,
    SplashScreen,
    CommonService,
    HttpClientModule,
    Geolocation,
    NativeGeocoder,
    OrientacionService,
    AuthService,
    SpeechRecognition,
    FijacionService,
    LocationService,
    DemoImage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
