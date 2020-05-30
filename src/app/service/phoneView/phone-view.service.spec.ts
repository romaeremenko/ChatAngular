import { TestBed } from '@angular/core/testing';

import { PhoneViewService } from './phone-view.service';

describe('PhoneViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneViewService = TestBed.get(PhoneViewService);
    expect(service).toBeTruthy();
  });
});
