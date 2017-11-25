import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    template: `Hello {{target}}`
})
export class HelloWorld {
    public target = 'World'
}