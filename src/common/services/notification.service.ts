import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar) { }

    public notify(message: string) {
        this.snackBar.open(message, null, { duration: 3000 } );
    }
}
