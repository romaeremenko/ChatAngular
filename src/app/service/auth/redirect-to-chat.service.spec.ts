import { TestBed } from '@angular/core/testing';

import { RedirectToChatService } from './redirect-to-chat.service';

describe('RedirectToChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedirectToChatService = TestBed.get(
      RedirectToChatService
    );
    expect(service).toBeTruthy();
  });
});
