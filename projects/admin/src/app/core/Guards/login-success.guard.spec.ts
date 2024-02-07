import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginSuccessGuard } from './login-success.guard';

describe('loginSuccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginSuccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
