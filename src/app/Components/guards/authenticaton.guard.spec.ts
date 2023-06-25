import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticatonGuard } from './authenticaton.guard';

describe('authenticatonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticatonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
