import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(translate: TranslateService) {
    //I can save it in local storage and load it from there
    translate.setDefaultLang('ar');
    translate.use('ar');      
  }
}
