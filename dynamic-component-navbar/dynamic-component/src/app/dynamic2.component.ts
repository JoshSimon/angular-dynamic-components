import { Component, Input } from '@angular/core';

import { FixedPartOfTheDynamicComponent } from './fixed-part-of-dynamic.component' /* this component will live inside the "DynamicComponentKeeper" to
later have access to all the dynamic components in one place */

@Component({
    template: `
    <div>
        <h2>{{data.h2}}</h2>
        <h3>{{data.h3}}</h3>
    </div>
    `
})

export class DynamicComponent2 implements FixedPartOfTheDynamicComponent {

    @Input() data: any; // gets the data, looking to fill the template with that --> f.e. "{{data.h2}}"
}