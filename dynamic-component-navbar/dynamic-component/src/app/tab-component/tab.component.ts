import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* DATA MODELS */
import { ExistingComponentsModel } from './data-models/existing-components.model';
import { MockDataModel } from '../data-models/mock-data.model';

/* DATA SERVICES */
import { MockDataService } from '../services/mocks-data.service'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {

  arrayOfAllExistingComponents: ExistingComponentsModel[];
  exisitingComponentIdCounter: number;
  activeTab: any; //TODO: data-model
  mocks: MockDataModel[]; // array of mock data


  constructor(private mockService: MockDataService) {
    this.mocks = this.mockService.getMocks();
    this.arrayOfAllExistingComponents = new Array<ExistingComponentsModel>();
    this.exisitingComponentIdCounter = 1
  };

  /* WATCHING CHANGES */
  // get the custom event emitter from "ngb-tabset"
  watchTabs(tabInformation: any) {
    this.activeTab = tabInformation.nextId;
  };

  /* CREATING NEW TABS */
  // if the user wants to create a new tab, this function is called and checks which one has to be created by giving it the right id
  // this is completly isolated from the ids in the DOM
  newTab(name: string) {
    this.arrayOfAllExistingComponents.push({ "name": name, "id": "ngb-tab-" + this.exisitingComponentIdCounter })
    this.exisitingComponentIdCounter++;
  };

  /* DESTROYING A TAB */
  // if the user has destroyed a tab, it is removed from the "dynamicComponents" array 
  // therefore it is not there anymore to be selected
  destroyTab() {
       this.arrayOfAllExistingComponents.forEach((item, index) => {
         if (this.activeTab == this.arrayOfAllExistingComponents[index].id) {
            this.arrayOfAllExistingComponents.splice(index, 1);
         }
       })
     

    // this.arrayOfAllExistingComponents = this.arrayOfAllExistingComponents.filter(function (component) { 
    //  console.log('TEST'+component.id, this.activeTab);
    //   return component.id != this.activeTab });
  }

}

