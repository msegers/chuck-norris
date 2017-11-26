import { TestBed } from "@angular/core/testing";
import { MatListModule } from "@angular/material";
import { FactListComponent } from "./fact-list.component";
import {BrowserModule} from "@angular/platform-browser";


describe("FactList", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                MatListModule,
            ],
            declarations: [
                FactListComponent,
            ],
        }).compileComponents();
    });

    it("Should be able to instantiate", () => {
        const factList = TestBed.createComponent(FactListComponent);
        const instance = factList.debugElement.componentInstance;
        expect(instance).toBeTruthy();
    });

    it ("Should show a list of facts defined", () => {
        let factList = TestBed.createComponent(FactListComponent);
        factList.detectChanges();
        let el = factList.debugElement.nativeElement;
        expect(el.querySelectorAll('mat-list-item').length).toBe(0);
        factList.componentInstance.facts = [
            { id: 1, joke: 'Chuck', favorite: false },
            { id: 2, joke: 'huckC', favorite: true },
            { id: 3, joke: 'uckCh', favorite: false },
        ];
        factList.detectChanges();
        el = factList.debugElement.nativeElement;
        expect(el.querySelectorAll('mat-list-item').length).toBe(3);
    });
});
