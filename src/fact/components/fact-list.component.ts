import {Component, Input, OnInit} from "@angular/core";

import {Fact} from "../models/fact";
import {FactService} from "../services/fact.service";

@Component({
    selector: "fact-list",
    styles: [
`mat-list-item button {
    float: right;
}
[mat-button] {
    margin-top: 16px;
}
`,
    ],
    template: `
<mat-card class="content">
    <mat-list *ngIf="facts.length">
        <ng-container *ngFor="let fact of facts">
            <mat-list-item>
                <button (click)="toggleFavorite(fact);" mat-icon-button color="accent">
                    <mat-icon>{{fact.favorite ? 'favorite' : 'favorite_border'}}</mat-icon>
                </button>
                <p>{{fact.joke}}</p>
            </mat-list-item>
            <mat-divider></mat-divider>
        </ng-container>
    </mat-list>
    <button color="primary" mat-button (click)="loadRandomFacts()">Load Random facts</button>
</mat-card>
`,
})
export class FactListComponent implements OnInit {
    @Input()
    public type: string;
    public facts: Fact[] = [];

    constructor(private factService: FactService) { }

    public loadRandomFacts() {
        this.factService.loadFacts();
    }

    public ngOnInit(): void {
        this.factService.subscribe(this.type, f => this.facts = f);
    }

    public toggleFavorite(fact: Fact) {
        this.factService.toggleFavorite(fact);
    }
}
