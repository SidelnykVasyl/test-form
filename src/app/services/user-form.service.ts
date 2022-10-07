import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserForm } from '../interfaces/user-form';


@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  private userForm$: BehaviorSubject<any> = new BehaviorSubject(null);
  private steps$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() { }

  getUserForm(): Observable<Partial<UserForm>>{
    return this.userForm$.asObservable();
  }

  setUserForm(value): void {
    this.userForm$.next({
      ...this.userForm$.value,
      ...value
    });
  }

  getSteps(): Observable<number> {
    return this.steps$.asObservable();
  }

  setSteps(value): void {
    this.steps$.next(
      value);
  }




}
