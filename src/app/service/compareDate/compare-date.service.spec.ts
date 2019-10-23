import { TestBed } from '@angular/core/testing';

import { CompareDate } from './compare-date.service';

describe('CompareDate', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompareDate = TestBed.get(CompareDate);
    expect(service).toBeTruthy();
  });
});
