import { AppComponent } from "./app.component";
import { TestBed } from "@angular/core/testing";
import { MatCommonModule, MatToolbarModule } from "@angular/material";

describe("AppComponent", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatToolbarModule,
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    it("be able to instantiate the app", () => {
        const appComponent = TestBed.createComponent(AppComponent);
        const instance = appComponent.debugElement.componentInstance;
        expect(instance).toBeTruthy();
    });

    it("Should contain an app (tool)bar with the Name in header", () => {
        let appComponent = TestBed.createComponent(AppComponent);
        appComponent.detectChanges();
        let el = appComponent.debugElement.nativeElement;
        expect(el.querySelector('h1').textContent).toContain('Chuck Norris Facts');
    });
});
