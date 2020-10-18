import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent} from './components/shared/home/home.component';
import { LoginComponent} from './components/commons/login/login.component';
import { RegistroComponent} from './components/commons/registro/registro.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'principal' // path: '',
    // component: AppComponent
  },
  {path: 'principal', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistroComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
