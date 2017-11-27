import {Component, Input, OnInit} from "@angular/core";

import {Fact} from "../models/fact";
import {FactService} from "../services/fact.service";

@Component({
    selector: "fact-list",
    template: `
    <mat-list>
        <mat-list-item *ngFor="let fact of facts">{{fact.joke}}</mat-list-item>
    </mat-list>
`,
})
export class FactListComponent implements OnInit {
    public facts: Fact[] = [];

    constructor(private factService: FactService) { }

    public ngOnInit(): void {
        this.factService.subscribe(f => this.facts = f);
    }

}
