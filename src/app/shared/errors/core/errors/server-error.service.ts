import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService {
    public httpInteceptorErrors = new BehaviorSubject<any>(null);
}
