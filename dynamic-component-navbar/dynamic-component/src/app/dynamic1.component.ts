import { Component, Input } from '@angular/core';

import { FixedPartOfTheDynamicComponent } from './fixed-part-of-dynamic.component' /* this component will live inside the "DynamicComponentKeeper" to
later have access to all the dynamic components in one place */

@Component({
    template: `
    <div>
        <h1>{{data.name}}</h1>
        <h4>{{data.id}}</h4>
    </div>
    `
})

export class DynamicComponent1 implements FixedPartOfTheDynamicComponent {

    @Input() data: any; // gets the data, looking to fill the template with that --> f.e. "{{data.h1}}"
}