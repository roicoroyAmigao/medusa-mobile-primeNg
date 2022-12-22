import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from './navigation.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    constructor(
        private store: Store,
        private navigation: NavigationService,
        private http: HttpClient
    ) { }

    public async logout(): Promise<void> {
        const deleteReq = this.http.delete(environment.MEDUSA_API_BASE_PATH + '/store/auth', { headers: this.headers_json });
        // this.store.dispatch(new UserActions.LogOutMedusaUser());
        // this.store.dispatch(new MedusaActions.LogOut());
        // this.store.dispatch(
        //     new StateClear(),
        // );
        this.navigation.navigateForward('/auth/login', 'back');
    }
}
