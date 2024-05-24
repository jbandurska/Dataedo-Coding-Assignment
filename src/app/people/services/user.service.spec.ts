import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { RandomUserResponse } from '../../feature/models/random-user-response.model';
import { RandomUserAPIService } from '../../feature/services/random-user-api.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userAPIServiceSpy: jasmine.SpyObj<RandomUserAPIService>;

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

  beforeEach(() => {
    userAPIServiceSpy = jasmine.createSpyObj('RandomUserAPIService', {
      getRandomUser: of(userResponse),
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: RandomUserAPIService,
          useValue: userAPIServiceSpy,
        },
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('getNewUser() should get new user from the API and pass it to userSubject', (done) => {
    service.getNewUser();

    expect(userAPIServiceSpy.getRandomUser).toHaveBeenCalled();

    service.user$.subscribe((user) => {
      expect(user).toEqual(userResponse.results[0]);
      done();
    });
  });
});
