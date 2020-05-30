import { TestBed } from '@angular/core/testing';

import { ShowTabsService } from './show-tabs.service';

describe('ShowTabsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowTabsService = TestBed.get(ShowTabsService);
    expect(service).toBeTruthy();
  });
});
