import { Injectable } from '@angular/core';
  
import {BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private messageSource = new BehaviorSubject<boolean>(false);
  currentTokenValue = this.messageSource.asObservable();
  constructor() { }

  changeflag(token: boolean) {
    this.messageSource.next(token);

  }
}
