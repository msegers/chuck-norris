import { AppComponent } from "./app.component";
import { TestBed } from "@angular/core/testing";
import { MatToolbarModule } from "@angular/material";
import { FactModule } from "../fact/fact.module";

describe("AppComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
                FactModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    it("Should be able to instantiate the app", () => {
        const appComponent = TestBed.createComponent(AppComponent);
        const instance = appComponent.debugElement.componentInstance;
        expect(instance).toBeTruthy();
    });

    it("Should contain an app (tool)bar with the Name in header", () => {
        let appComponent = TestBed.createComponent(AppComponent);
        let el = appComponent.debugElement.nativeElement;
        expect(el.querySelector('h1').textContent).toContain('Chuck Norris Facts');
    });

    it ("Should contain a FactList", () => {
        let appComponent = TestBed.createComponent(AppComponent);
        let el = appComponent.debugElement.nativeElement;
        expect(el.querySelector('fact-list')).toBeTruthy();
    });
});
