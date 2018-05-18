import { TestBed, inject } from '@angular/core/testing';

import { TododataserviceService } from './tododataservice.service';

describe('TododataserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TododataserviceService]
    });
  });

  it('should be created', inject([TododataserviceService], (service: TododataserviceService) => {
    expect(service).toBeTruthy();
  }));
});
