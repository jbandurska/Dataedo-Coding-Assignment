import { TestBed } from '@angular/core/testing';

import { RandomUserAPIService } from './random-user-api.service';

describe('RandomUserAPIService', () => {
  let service: RandomUserAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomUserAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
