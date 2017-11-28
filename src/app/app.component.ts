import { Component, ViewEncapsulation } from "@angular/core";
import { FactService } from "../fact/services/fact.service";

// TODO: Figure out a way to load material without warning
// https://stackoverflow.com/questions/41516346/error-expected-styles-to-be-an-array-of-strings
@Component({
    encapsulation: ViewEncapsulation.None,
    selector: "app",
    styleUrls:  [
        "./material.css",
        "./app.styles.css",
    ] ,
    template: `
    <mat-toolbar color="primary">
        <h1>Chuck Norris Facts</h1>
    </mat-toolbar>
    <fact-list [type]="random"></fact-list>
`,
})
export class AppComponent {
    private random: string;
    constructor() {
        this.random = FactService.RANDOM;
    }
}
