import { TestBed } from '@angular/core/testing';

import { UserProfileUpdateService } from './user-profile-update.service';

describe('UserProfileUpdateService', () => {
  let service: UserProfileUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
