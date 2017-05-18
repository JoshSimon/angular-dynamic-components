import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DynamicComponent1 } from './dynamic1.component';
import { DynamicComponent2 } from './dynamic2.component';
import { MyStructuralDirective } from './my-structural-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent1,
    DynamicComponent2,
    MyStructuralDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ DynamicComponent1, DynamicComponent2 ]  // here all dynamic components that are available should be
})
export class AppModule { }
