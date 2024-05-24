import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { RandomUserResponse } from '../models/random-user-response.model';
import { RandomUserAPIService } from './random-user-api.service';

describe('RandomUserAPIService', () => {
  const userResponse: RandomUserResponse = {
    results: [
      {
        name: {
          title: 'Mr',
          first: 'John',
          last: 'Watson',
        },
        picture: {
          large: 'large',
          medium: 'medium',
          thumbnail: 'thumbnail',
        },
      },
    ],
  };

  let service: RandomUserAPIService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RandomUserAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRandomUser() should get a user from the API', async () => {
    const userResponse$ = service.getRandomUser();
    const userResponsePromise = firstValueFrom(userResponse$);

    const req = httpTesting.expectOne(
      'https://randomuser.me/api/?inc=name,picture&noinfo=true',
      'Request to load a random user'
    );
    expect(req.request.method).toBe('GET');

    req.flush(userResponse);
    expect(await userResponsePromise).toEqual(userResponse);

    httpTesting.verify();
  });
});
