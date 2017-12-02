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
    <mat-tab-group md-stretch-tabs>
        <mat-tab *ngFor="let type of types" [label]="type">
            <fact-list [type]="type"></fact-list>
        </mat-tab>
    </mat-tab-group>
`,
})
export class AppComponent {
    private types: string[] = [];
    constructor() {
        this.types = [FactService.RANDOM, FactService.FAVORITE];
    }
}
