import { TestBed } from '@angular/core/testing';

import { InputMessageService } from './input-message.service';

describe('InputMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InputMessageService = TestBed.get(
      InputMessageService
    );
    expect(service).toBeTruthy();
  });
});
