import { Type } from '@angular/core';

export class DynamicComponent {
  constructor(public component: Type<any>, public data: any) {}
}


/* I will be created with an instance of a component type (in this case any) and its related data ) */

