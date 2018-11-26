import { TestBed } from '@angular/core/testing';

import { RequestCardsService } from './request-cards.service';

describe('RequestCardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestCardsService = TestBed.get(RequestCardsService);
    expect(service).toBeTruthy();
  });
});
