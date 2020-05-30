import { TestBed } from '@angular/core/testing';

import { ChatMembersService } from './chat-members.service';

describe('ChatMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatMembersService = TestBed.get(
      ChatMembersService
    );
    expect(service).toBeTruthy();
  });
});
