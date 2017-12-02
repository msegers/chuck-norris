import { NgModule } from "@angular/core";
import { MatSnackBarModule } from "@angular/material";

import { NotificationService } from "./services/notification.service";

@NgModule({
    imports: [
        MatSnackBarModule,
    ],
    providers: [
        NotificationService,
    ],
})
export class CommonModule { }
