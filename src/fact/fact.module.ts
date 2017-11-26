import { NgModule } from "@angular/core";
import { FactListComponent } from "./fact-list.component";
import { MatListModule } from "@angular/material";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [
        MatListModule,
        BrowserModule,
    ],
    declarations: [FactListComponent],
    exports: [FactListComponent],
})
export class FactModule { }
