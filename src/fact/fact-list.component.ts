import {Component, Input} from "@angular/core";

import {Fact} from "./fact";

@Component({
    selector: "fact-list",
    template: `
    <mat-list>
        <mat-list-item *ngFor="let fact of facts">{{fact.joke}}</mat-list-item>
    </mat-list>
`,
})
export class FactListComponent {
    @Input()
    public facts: Fact[] = [];
}
