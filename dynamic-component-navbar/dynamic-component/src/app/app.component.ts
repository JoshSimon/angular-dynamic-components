import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
/*
Component - directive with decorator to assign a template and selector;

*/

import { MyStructuralDirective } from './my-structural-directive.directive';
import { FixedPartOfTheDynamicComponent } from './fixed-part-of-dynamic.component';
import { DynamicComponent } from './app.dynamic.component';
import { DynamicComponent1 } from './dynamic1.component';
import { DynamicComponent2 } from './dynamic2.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  dynamicComponents: DynamicComponent[] = [
      new DynamicComponent(DynamicComponent1, { 'h1': 'I am dynamic', 'h2': 'really dynamic' }),
      new DynamicComponent(DynamicComponent2, { 'h1': 'I am dynamic  222', 'h2': 'really dynamic 222' })
    ]; // I have ana array of dynamic components that will be created at a certain point AND I keep them in here

@ViewChild(MyStructuralDirective) componentHost: MyStructuralDirective; // accessing the html directive and referencing that as componentHost, the html code that host the html of the dynamic component 

  ngOnInit() { // on init I want to have my array of component ready
  }

  constructor(private myComponentFactoryResolver: ComponentFactoryResolver) { };

  /* The AfterView sample explores the AfterViewInit() and AfterViewChecked() 
  hooks that Angular calls after it creates a component's child views. 
  
  --> the child views are created before angular runs the application */
  ngAfterViewInit() {
    this.loadMyDynamicComponent(); /* the dynamic component is loaded within that life cycle hook */
  }

  

  loadMyDynamicComponent() {
    let containerWhereToAttachTheView = this.componentHost.vCR; // reference from the directive
    /* get the constructed and public viewContainerReference instance which will create the dynamic component */
    containerWhereToAttachTheView.clear(); /* I am changing the html inside the dynamic component therefore I have to clear everytime if I want to have smth new*/


    let myComponentFactory = this.myComponentFactoryResolver.resolveComponentFactory(this.dynamicComponents[0].component); /* Take the first one and from that the component */
    /* renders the dynamic component instance into the app.component instance */

    let myComponentReference = containerWhereToAttachTheView.createComponent(myComponentFactory); /* A new reference but htis time not the the host , to the actual new html that is fromm the new created component */

    (<FixedPartOfTheDynamicComponent>myComponentReference.instance).data = this.dynamicComponents[1].data; /* assign the keeper of the dynamic components some data to
    populate the templates in the dynamic components */

    /*Taking the first one and aksinmg for the data */
  }

}

