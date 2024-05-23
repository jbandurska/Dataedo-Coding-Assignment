import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { RandomUserAPIService } from '../../feature/services/random-user-api.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private randomUserAPIService: RandomUserAPIService) {}

  public getNewUser(): void {
    this.randomUserAPIService
      .getRandomUser()
      .pipe(
        map((response) => response.results[0]),
        tap((user) => this.userSubject.next(user))
      )
      .subscribe();
  }
}
