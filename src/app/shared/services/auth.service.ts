import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { NavigationService } from './navigation.service';
import { AuthActions } from 'src/app/store/auth.actions';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MedusaActions } from 'src/app/store/medusa.actions';

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
        this.http.delete(environment.MEDUSA_API_BASE_PATH + '/store/auth', { headers: this.headers_json })
        this.store.dispatch(new AuthActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
        this.navigation.navigateForward('/auth/login', 'back');
    }
}
