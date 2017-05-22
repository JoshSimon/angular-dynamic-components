import { MOCKS } from '../mocks';
import { Injectable } from '@angular/core';
import { MockDataModel } from '../data-models/mock-data.model';

@Injectable()
export class MockDataService {
    private mocks: MockDataModel[]; // having a private array of the actual data
    

    constructor() {
        this.mocks = MOCKS;
    };
    getMocks() {
        return this.mocks;
    };
    
   

}

