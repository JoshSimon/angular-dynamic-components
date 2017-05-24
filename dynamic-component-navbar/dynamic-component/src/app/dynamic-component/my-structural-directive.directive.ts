import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[myHost]'
})

export class MyStructuralDirective {
    constructor(public vCR: ViewContainerRef) {}
}

// creating a directiv which has the reference the html which will keep the dynamic component html