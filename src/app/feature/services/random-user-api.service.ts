import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RandomUserResponse } from '../models/random-user-response.model';

@Injectable({
  providedIn: 'root',
})
export class RandomUserAPIService {
  constructor(private http: HttpClient) {}

  public getRandomUser(): Observable<RandomUserResponse> {
    let params = new HttpParams();

    params = params.set('inc', 'name,picture');
    params = params.set('noinfo', true);

    return this.http.get<RandomUserResponse>('https://randomuser.me/api/', {
      params,
    });
  }
}
