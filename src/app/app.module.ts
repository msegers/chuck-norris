import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
    selector: 'hello-world',
    template: `Hello {{target}}`
})
export class HelloWorld {
    public target = 'World'
}
@NgModule({
    imports: [BrowserModule],
    declarations: [HelloWorld],
    bootstrap: [HelloWorld]
})
export class AppModule { }