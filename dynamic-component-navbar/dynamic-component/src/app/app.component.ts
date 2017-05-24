import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* CUSTOM COMPONENTS */
import { MyStructuralDirective } from './my-structural-directive.directive';
import { FixedPartOfTheDynamicComponent } from './fixed-part-of-dynamic.component';
import { DynamicComponent } from './app.dynamic.component';
import { DynamicComponent1 } from './dynamic1.component';
import { DynamicComponent2 } from './dynamic2.component';

/* DATA SERVICES */
import { MockDataService } from './services/mocks-data.service'

/* DATA MODELS*/
import { MockDataModel } from './data-models/mock-data.model';
import { ExistingComponentsModel } from './data-models/exisiting-components.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  mocks: MockDataModel[]; // array of mock data
  dynamicComponentsToChooseFrom: DynamicComponent[]; // array of components that will created dynamically
  arrayOfAllExistingComponents: ExistingComponentsModel[]; // array keeps the existing components with its dedicated id //TODO: data type

  /* CONSTRUCTOR */
  // constructs the component factory resolver and the data service for loading the mocks
  // additionally creates the first default entry in the "arrayOfAllExistingComponents" array with its construction
  constructor(private myComponentFactoryResolver: ComponentFactoryResolver, private mockService: MockDataService) {
    this.instanciateDynamicComponentWithMockData();
    this.arrayOfAllExistingComponents = [{
      "name": this.dynamicComponentsToChooseFrom[0].data.name,
      "id": "ngb-tab-1 ",
      "description": this.dynamicComponentsToChooseFrom[0].data.name
    }];
    console.log(this.mocks[0]);
  };
  // instanciating is done within the constructor, because it has to be finished before the dynamic components are loaded
  instanciateDynamicComponentWithMockData() {
    // get the mock data from the service
    this.mocks = this.mockService.getMocks()
    // the place to keep the dynamic components and feeding them with the mocks data, they will not be created at this point
    // (but instanciated)
    this.dynamicComponentsToChooseFrom = [
      new DynamicComponent(DynamicComponent1, this.mocks[0]), // needing new instances of that dynamic component because ???
      new DynamicComponent(DynamicComponent2, this.mocks[1])
    ];
  }

  /* HOST FOR THE DYNAMIC COMPONENT */
  // this pre-build directive is accessing the html directive which is the reference for the dynamic component
  // in this case it is the "MyStructuralDirective"
  @ViewChild(MyStructuralDirective) componentHost: MyStructuralDirective;

  /* LOADING DYNAMIC COMPONENTS */
  // life cycle hook that explores the dynamic possible child elements to be able to build them later on in runtime 
  // or it creates the child views to Angular terminology
  ngAfterViewInit() {
    console.log('INSTAINSTA')
    this.loadMyDynamicComponent(this.dynamicComponentsToChooseFrom[0]); //loading the default first item out of the "dynamicComponents" array   

  };
  // this function lives within the life cycle hook
  // it references the container where to attach the view ( the dynamically created component )
  loadMyDynamicComponent(dynamicComponent) {
    let containerWhereToAttachTheView = this.componentHost.vCR; // the host for the dynamic component has a "ViewContainerRef" constructed as "vCR" 
    // "vCR" is the actual referencable container with the defined "selector: '[myHost]'"
    // due to chaning the acutal html within the component host, it has to cleared if I want to see something new ( something was newly dynamically created)
    containerWhereToAttachTheView.clear();
    // it takes the according component from the array which is keeping the dynamic components and renders is into the app component html template in the host container
    let myComponentFactory = this.myComponentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
    // create (intantiating) the component within the host container with the help of the "ViewContainerRef.createComponent" method  
    // this method comes from the component host which constructed the "ViewContainerRef"
    // referencing the actual dynamic component to the component factory resolver which has it ready rendered by now
    let myComponentReference = containerWhereToAttachTheView.createComponent(myComponentFactory);
    // hand the data which should be user for population the "{{ ... }}" in the dynamic components 
    (<FixedPartOfTheDynamicComponent>myComponentReference.instance).data = dynamicComponent.data;
    // ??? so I am only using the first entry of mocks ???
  }

  counter: number = 2;
  /* CREATING NEW TABS */
  // if the user wants to create a new tab, this function is called and checks which one has to be created
  newTab(name: string, howTheUserCallsIt: string) {
    for (let i in this.dynamicComponentsToChooseFrom) {
      if (name == this.dynamicComponentsToChooseFrom[i].data.name) {
        // this.loadMyDynamicComponent(this.dynamicComponentsToChooseFrom[i]);
        this.arrayOfAllExistingComponents.push({ "name": name, "id": "ngb-tab-" + this.counter, "description": howTheUserCallsIt })
      }
    }
    this.counter++;
  };
  // helper function for "newTab"
  // create an individual id for each tab, literally when the user creates it
  // this enables to distinguish and display the tabs
  createAnIndividualId(name: string) {
    let TIME = new Date().getTime();
    let ID = name + TIME;
    console.log('id :' + ID);
    return ID;
  }

  ITEM: any;

  // /* DESTROYING A TAB */
  // ngOnDestroy() {
  //   // ??? what goes in here ???
  // }
  // if the user has destroyed a tab, it is removed from the "dynamicComponents" array 
  // therefore it is not there anymore to be selected
  destroyTab(object: any) {
    console.log(object);
/*    this.arrayOfAllExistingComponents.forEach((item, index) => {
      console.log('ITEM' + item);
      console.log(index);

      this.ITEM = item;

      if (this.stuff.nextId == this.arrayOfAllExistingComponents[index].id) {
        this.arrayOfAllExistingComponents.splice(index, 1);
      }
    })*/
  };

  // /* SELECT THE TAB THE USER WANTS TO SEE */
  // // will be called on clicking on a tab (getting it's id)
  // onChangeTab(id: string) {
  //   for (let i of this.arrayOfAllExistingComponents) {
  //     // checking which one of the existing tabs was selected
  //     if (id == this.arrayOfAllExistingComponents[i].id) {
  //       //with the help of the tabSet one may select by the id from the "arrayOfAllExistingComponents" array
  //       tabSet.select(this.arrayOfAllExistingComponents[i].id);
  //     }
  //   }
  //   this.loadMyDynamicComponent(this.dynamicComponents[0]);
  // };



  onClick(name: string) {
    console.log('The following should be created: ' + name);
    switch (name) {
      case this.mocks[0].name: {
        this.loadMyDynamicComponent(this.dynamicComponentsToChooseFrom[0]);
        break;
      }
      case this.mocks[1].name: {
        this.loadMyDynamicComponent(this.dynamicComponentsToChooseFrom[1]);
        break;
      }
    }
  }

  stuff: any;
  test(object: any) {
    console.log('custom event : ' + object);
    this.stuff = object;
  }
}

