import { TestBed } from "@angular/core/testing";
import {MatButtonModule, MatCardModule, MatIconModule, MatListModule} from "@angular/material";
import { FactListComponent } from "./fact-list.component";
import { BrowserModule } from "@angular/platform-browser";
import { FactService } from "../services/fact.service";


describe("FactList", () => {
    let mockFactService: FactService;
    beforeEach(() => {

        mockFactService = {
            subscribe: (f:Function) => {},
            loadFacts: () => {},
        } as any as FactService;

        TestBed.configureTestingModule({
            imports: [
                BrowserModule,
                MatButtonModule,
                MatCardModule,
                MatIconModule,
                MatListModule,
            ],
            providers: [
                {provide: FactService, useValue: mockFactService},
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
        var listItems = el.querySelectorAll('mat-list-item');
        expect(listItems.length).toBe(3);
        expect(listItems[0].querySelector('mat-icon').textContent).toBe("favorite_border");
        expect(listItems[1].querySelector('mat-icon').textContent).toBe("favorite");

    });

    it("Should call FactService loadFacts when clicking the loadRandom button", () => {
        spyOn(mockFactService, "loadFacts");

        let factList = TestBed.createComponent(FactListComponent);
        factList.detectChanges();
        factList.debugElement.nativeElement.querySelector('[mat-button]').click();

        expect(mockFactService.loadFacts).toHaveBeenCalled();

    });
});
