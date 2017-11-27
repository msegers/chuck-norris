import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";

import { FactListComponent } from "./components/fact-list.component";
import { FactService } from "./services/fact.service";

@NgModule({
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatListModule,
        BrowserModule,
        HttpClientModule,
    ],
    declarations: [FactListComponent],
    providers: [FactService],
    exports: [FactListComponent],
})
export class FactModule { }
