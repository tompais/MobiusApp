import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/services/common/common.service';
import { User } from '../models/User';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  user: User = null;
  primaryApp: AppComponent = null;

  constructor(public commonService: CommonService, public app: AppComponent) {
    this.user = new User();
    this.primaryApp = app;
  }

  ngOnInit() {
    this.user = new User();
  }

  public registro() {
    this.commonService.login(this.user)
      .subscribe((resp: any) => {
      //  console.log('DISPARO EL EVENT');
      //  console.log('OK');
      }, (error: Error) => {
        // console.log(error);
      });
  }

}
