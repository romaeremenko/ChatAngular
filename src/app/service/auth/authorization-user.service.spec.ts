import { TestBed } from '@angular/core/testing';

import { AuthorizationUserService } from './authorization-user.service';

describe('AuthorizationUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationUserService = TestBed.get(AuthorizationUserService);
    expect(service).toBeTruthy();
  });
});
