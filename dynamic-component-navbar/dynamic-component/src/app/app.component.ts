import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MyStructuralDirective } from './my-structural-directive.directive';
import { FixedPartOfTheDynamicComponent } from './fixed-part-of-dynamic.component';
import { DynamicComponent } from './app.dynamic.component';
import { DynamicComponent1 } from './dynamic1.component';
import { DynamicComponent2 } from './dynamic2.component';
import { MockDataService } from './services/mocks-data.service'
import { MockDataModel } from './data-models/mock-data.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mocks: MockDataModel[];

  /* CONSTRUCTOR */
  // constructs the component factory resolver and the data service for loading the mocks
  constructor(private myComponentFactoryResolver: ComponentFactoryResolver, private mockService: MockDataService) {
    this.getMocks();
    console.log(this.mocks[0]);
  };

  /* KEEPING DYNAMIC COMPONENTS */
  // the place to keep the dynamic components and feeding them with the mocks data, they will not be created at this point
  dynamicComponents: DynamicComponent[] = [
    new DynamicComponent(DynamicComponent1, this.mocks[0]), // needing new instances of that dynamic component because ???
    new DynamicComponent(DynamicComponent2, this.mocks[1])
  ];

  /* HOST FOR THE DYNAMIC COMPONENT */
  // this pre-build directive is accessing the html directive which is the reference for the dynamic component
  // in this case it is the "MyStructuralDirective"
  @ViewChild(MyStructuralDirective) componentHost: MyStructuralDirective;

  /* LOADING DYNAMIC COMPONENTS */
  // life cycle hook that explores the dynamic possible child elements to be able to build them later on in runtime 
  // or it creates the child views to Angular terminology
  ngAfterViewInit() {
    this.loadMyDynamicComponent();
  } ;

  // this function lives within the life cycle hook
  // it references the container where to attach the view ( the dynamically created component )
  loadMyDynamicComponent() {
    let containerWhereToAttachTheView = this.componentHost.vCR; // the host for the dynamic component has a "ViewContainerRef" constructed as "vCR" 
    // "vCR" is the actual referencable container with the defined "selector: '[myHost]'"

    // due to chaning the acutal html within the component host, it has to cleared if I want to see something new ( something was newly dynamically created)
    containerWhereToAttachTheView.clear();

    // it takes the according component from the array which is keeping the dynamic components and renders is into the app component html template in the host container
    let myComponentFactory = this.myComponentFactoryResolver.resolveComponentFactory(this.dynamicComponents[0].component); 

    // create (intantiating) the component within the host container with the help of the "ViewContainerRef.createComponent" method  
    // this method comes from the component host which constructed the "ViewContainerRef"
    // referencing the actual dynamic component to the component factory resolver which has it ready rendered by now
    let myComponentReference = containerWhereToAttachTheView.createComponent(myComponentFactory); 

    // hand the data which should be user for population the "{{ ... }}" in the dynamic components 
    (<FixedPartOfTheDynamicComponent>myComponentReference.instance).data = this.dynamicComponents[1].data; 

    // ??? so I am only using the first entry of mocks ???

  };

  getMocks() {
    this.mocks = this.mockService.getMocks()
  }

}

