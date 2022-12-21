import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {
  public addCartItem = new BehaviorSubject<any>(null);
  public removeCartItem = new BehaviorSubject<any>(null);
}
