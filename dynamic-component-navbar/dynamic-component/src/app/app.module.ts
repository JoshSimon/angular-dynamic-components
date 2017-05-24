import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DynamicComponent1 } from './dynamic-component/dynamic1.component';
import { DynamicComponent2 } from './dynamic-component/dynamic2.component';
import { MyStructuralDirective } from './dynamic-component/my-structural-directive.directive';
import { MockDataService } from './services/mocks-data.service';
import { TabComponent } from './tab-component/tab.component'

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent1,
    DynamicComponent2,
    MyStructuralDirective,
    TabComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [ MockDataService ],
  bootstrap: [AppComponent],
  entryComponents: [ DynamicComponent1, DynamicComponent2 ]  // here all dynamic components that are available should be
})
export class AppModule { }
