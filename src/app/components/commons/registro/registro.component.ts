import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { User } from '../models/User';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {

  user: User;

  constructor(public commonService: CommonService) { }

  ngOnInit() {
    this.user = new User();
  }

  registro() {
    this.commonService.login(this.user)
      .subscribe((resp: any) => {
        console.log('DISPARO EL EVENT');
        console.log('OK');
      }, (error: Error) => {
        console.log(error);
      });
  }

}
