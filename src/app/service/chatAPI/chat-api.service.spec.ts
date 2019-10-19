import { TestBed } from '@angular/core/testing';

import { ChatAPIService } from './chat-api.service';

describe('ChatAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatAPIService = TestBed.get(ChatAPIService);
    expect(service).toBeTruthy();
  });
});
