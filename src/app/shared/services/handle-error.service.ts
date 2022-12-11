import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
    providedIn: 'root'
})
export class HandleErrorService {
    public AppErrors = new BehaviorSubject<any>(null);

    constructor(
        private utility: UtilityService,
    ) { }

    handleError(error: HttpErrorResponse) {
        this.utility.presentAlert(error);
    }
}
